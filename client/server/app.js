const Koa = require('koa');
const Next = require('next');
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

const app = Next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.keys = [SHOPIFY_API_SECRET_KEY];
  server.use(c2k(proxy('/api', { target: API_URL })));

  router.use(session(server));

  router.use(
    '/auth',
    createShopifyAuth({
      apiKey: SHOPIFY_API_CLIENT_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['write_script_tags'],
      afterAuth(ctx) {
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
          body: scriptTagBody,
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
          json: true,
        };

        const scriptTagApiUrl = `https://${shop}/admin/script_tags.json`;

        fetch(scriptTagApiUrl, addScriptTagOptions);

        ctx.redirect('/');
      },
    }),
    verifyRequest(),
  );

  router.get('/bars/:id', async (ctx) => {
    const query = Object.assign({}, ctx.query, ctx.params);
    await app.render(ctx.req, ctx.res, '/single-bar', query);
    ctx.respond = false;
  });

  router.get('*', async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }

    console.log(`> Ready on ${TUNNEL_URL}, PORT: ${port}`); // eslint-disable-line no-console
  });
});
