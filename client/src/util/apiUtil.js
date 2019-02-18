import fetch from 'isomorphic-fetch';
import { decamelizeKeys } from 'humps';

const { TUNNEL_URL } = process.env;
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

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const apiCall = (method, url, props) => {
  const jwtToken = window.localStorage.getItem('jwtToken');

  const args = {
    method,
    headers: {
      ...headers,
      AUTHORIZATION: `Bearer ${jwtToken}`,
    },
  };

  if (args.method === 'POST' || args.method === 'PATCH') {
    args.body = JSON.stringify(decamelizeKeys(props, { separator: '_' }));
  }

  return fetchPromise(url, args);
};

export const apiSetToken = (shopOrigin) =>
  fetchPromise(`shops/${shopOrigin}/session`, { method: 'GET', headers }).then((payload) => {
    window.localStorage.setItem('jwtToken', payload.jwtToken);
  });

export const apiUpdateBar = (id, body) => fetchPromise(`bars/${id}`, { method: 'PATCH', body });

export const apiFetch = (url, props = {}) => apiCall('GET', url, props);
export const apiCreate = (url, props = {}) => apiCall('POST', url, props);
export const apiUpdate = (url, props = {}) => apiCall('PATCH', url, props);
export const apiDestroy = (url) => fetchPromise(url, { method: 'DELETE' });
