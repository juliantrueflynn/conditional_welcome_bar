const Koa = require('koa');
const next = require('next');
const session = require('koa-session');
const Router = require('koa-router');
const { default: createShopifyAuth, verifyRequest } = require('@shopify/koa-shopify-auth');
const dotenv = require('dotenv');
const proxy = require('http-proxy-middleware');
const c2k = require('koa2-connect');
require('isomorphic-fetch');

dotenv.config();

const {
  NODE_ENV,
  PORT,
  SHOPIFY_API_CLIENT_KEY,
  SHOPIFY_API_SECRET_KEY,
  TUNNEL_URL,
  API_URL,
} = process.env;

const dev = NODE_ENV !== 'production';
const port = parseInt(PORT, 10) || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(session(server));

  router.get('/bars/:id', async (ctx) => {
    await app.render(ctx.req, ctx.res, '/single-bar', ctx.query);
    ctx.respond = false;
  });

  server
    .use(c2k(proxy('/api', { target: API_URL })))
    .use(
      createShopifyAuth({
        apiKey: SHOPIFY_API_CLIENT_KEY,
        secret: SHOPIFY_API_SECRET_KEY,
        scopes: ['write_script_tags'],
        async afterAuth(ctx) {
          const { shop, accessToken } = ctx.session;
          ctx.cookies.set('shopOrigin', shop, { httpOnly: false });

          const scriptTagBody = JSON.stringify({
            script_tag: {
              event: 'onload',
              src: `${TUNNEL_URL}/static/js/welcomeBar.js`,
            },
          });

          const addScriptTagOptions = {
            method: 'POST',
            credentials: 'include',
            body: scriptTagBody,
            headers: {
              'X-Shopify-Access-Token': accessToken,
              'Content-Type': 'application/json',
              Accept: '*/*',
            },
            json: true,
          };

          const scriptTagApiUrl = `https://${shop}/admin/script_tags.json`;

          await fetch(scriptTagApiUrl, addScriptTagOptions).then((response) => response.json());

          ctx.redirect('/');
        },
      }),
    )
    .use(verifyRequest())
    .use(router.routes())
    .use(async (ctx) => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
      ctx.res.statusCode = 200;
      return false;
    })
    .listen(port, (err) => {
      if (err) {
        throw err;
      }

      console.log(`> Ready on ${TUNNEL_URL}, PORT: ${port}`); // eslint-disable-line no-console
    });
});