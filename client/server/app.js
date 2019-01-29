const Koa = require('koa');
const next = require('next');
const session = require('koa-session');
const Router = require('koa-router');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const dotenv = require('dotenv');
require('isomorphic-fetch');

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, PROXY_URL } = process.env;

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.use(session(server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['write_script_tags'],
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set('shopOrigin', shop, { httpOnly: false });
        ctx.redirect('/');
      },
    }),
  );

  router.get('/bars/:id', async (ctx) => {
    await app.render(ctx.req, ctx.res, '/single-bar', ctx.query);
    ctx.respond = false;
  });

  server.use(verifyRequest());
  server.use(router.routes());
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
    return false;
  });

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }

    console.log(`> Ready on ${PROXY_URL}`); // eslint-disable-line no-console
  });
});
