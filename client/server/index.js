import dotenv from 'dotenv';
import Koa from 'koa';
import session from 'koa-session';
import createShopifyAuth, { verifyRequest } from '@shopify/koa-shopify-auth';
import renderReactApp from './render-react-app';
import webpack from 'koa-webpack';
import proxy from 'http-proxy-middleware';
import c2k from 'koa2-connect';
import serve from 'koa-static-server';

dotenv.config();
const {
  SHOPIFY_API_SECRET_KEY,
  SHOPIFY_API_CLIENT_KEY,
  TUNNEL_URL,
  API_URL,
} = process.env;

const app = new Koa();

app.keys = [SHOPIFY_API_SECRET_KEY];

app
  .use(serve({ rootDir: 'static', rootPath: '/static' }))
  .use(c2k(proxy('/api', { target: API_URL, changeOrigin: true })))
  .use(session(app))
  .use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_CLIENT_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['write_script_tags'],
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set('shopOrigin', shop, { httpOnly: false });

        await fetch(`https://${shop}/admin/script_tags.json`, {
          method: 'POST',
          body: JSON.stringify({
            script_tag: {
              event: 'onload',
              src: `${TUNNEL_URL}/static/js/welcomeBar.js`,
            },
          }),
          headers: {
            'X-Shopify-Access-Token': accessToken,
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
          json: true,
        });

        await fetch(`${TUNNEL_URL}/api/shop`, {
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
    })
  )
  .use(verifyRequest())
  .use(renderReactApp)
  .use(webpack());

export default app;
