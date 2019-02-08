import fetch from 'isomorphic-fetch';
import { parseCookies, setCookie } from 'nookies';
import { decamelizeKeys } from 'humps';

export const getShopOrigin = (ctx) => {
  const { shopOrigin } = parseCookies(ctx);

  return ctx.query.shop || shopOrigin || null;
};

export const setShopOriginCookie = (ctx) => {
  const { shopOrigin } = parseCookies(ctx);

  if (!shopOrigin && ctx.query.shop) {
    setCookie(ctx, 'shopOrigin', ctx.query.shop, { httpOnly: false });
  }
};

// eslint-disable-next-line no-undef
const endpoint = (url) => `${TUNNEL_URL}/api/${url}`;

const fetchPromise = (url, args) =>
  fetch(endpoint(url), { credentials: 'include', ...args })
    .then((response) => response.json().then((json) => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        throw json;
      }

      return json;
    })
    .catch((error) => {
      throw error || ['Unknown error!'];
    });

export const apiCall = (method, url, props) => {
  const args = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (args.method === 'POST' || args.method === 'PATCH') {
    args.body = JSON.stringify(decamelizeKeys(props, { separator: '_' }));
  }

  return fetchPromise(url, args);
};

export const apiFetch = (url, props = {}) => apiCall('GET', url, props);
export const apiCreate = (url, props = {}) => apiCall('POST', url, props);
export const apiUpdate = (url, props = {}) => apiCall('PATCH', url, props);
export const apiDestroy = (url) => fetchPromise(url, { method: 'DELETE' });
