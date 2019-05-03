require('isomorphic-fetch');
const Koa = require('koa');
const session = require('koa-session');
const { default: shopifyAuth, verifyRequest } = require('@shopify/koa-shopify-auth');
const proxy = require('http-proxy-middleware');
const c2k = require('koa2-connect');
const serve = require('koa-static-server');
const path = require('path');
const Router = require('koa-router');
const send = require('koa-send');

const { REACT_APP_SHOPIFY_API_SECRET_KEY, REACT_APP_SHOPIFY_API_CLIENT_KEY, REACT_APP_TUNNEL_URL, REACT_APP_API_URL } = process.env;

const app = new Koa();
const router = new Router();

app.keys = ['d9c45d8ef5b0764d4daae76d03384e9e'];

app.use(async (ctx) => {
  // res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  await send(ctx, ctx.path, { root: __dirname + '/build', index: 'index.html' });
});

app
  .use(serve({ rootDir: 'build', rootPath: '/build', index: 'index.html' }))
  .use(serve({ rootDir: 'static', rootPath: '/static' }))
  .use(c2k(proxy('/api', { target: 'http://localhost:3001', changeOrigin: true })))
  .use(session(app))
  .use(
    shopifyAuth({
      apiKey: '152795923769209f42dc388f9a61a0f8',
      secret: 'd9c45d8ef5b0764d4daae76d03384e9e',
      scopes: ['write_script_tags'],
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set('shopOrigin', shop, { httpOnly: false });

        await fetch(`https://${shop}/admin/script_tags.json`, {
          method: 'POST',
          body: JSON.stringify({
            script_tag: {
              event: 'onload',
              src: `https://conditionalwelcomebar.ngrok.io/static/js/welcomeBar.js`,
            },
          }),
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
          json: true,
        });

        await fetch(`https://conditionalwelcomebar.ngrok.io/api/shop`, {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({ shopify_domain: shop, shopify_token: accessToken }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        ctx.redirect('/');
      },
    }),
  )
  .use(verifyRequest())
  .use(router.routes());

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${3000}`);
});
