import fetch from 'isomorphic-fetch';
import cookies from 'next-cookies';
import { decamelizeKeys } from 'humps';

export const parseShopOrigin = (ctx) => {
  const { shopOrigin } = cookies(ctx);
  const { shop } = ctx.query;
  const shopParsed = shop || shopOrigin;

  return shopParsed.replace('.myshopify.com', '');
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
