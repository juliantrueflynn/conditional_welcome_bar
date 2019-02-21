import fetch from 'isomorphic-fetch';
import { decamelizeKeys } from 'humps';

const endpoint = (url) => `${process.env.TUNNEL_URL}/api/${url}`;

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

const getTokenHeader = () => {
  if (window) {
    const jwt = window.localStorage.getItem('cwb_jwt');

    return { AUTHORIZATION: `Bearer ${jwt}` };
  }

  return {};
};

export const apiCall = (method, url, props) => {
  const args = {
    method,
    headers: { ...headers, ...getTokenHeader() },
  };

  if (args.method === 'POST' || args.method === 'PATCH') {
    args.body = JSON.stringify(decamelizeKeys(props, { separator: '_' }));
  }

  return fetchPromise(url, args);
};

export const apiSetToken = (shopOrigin) =>
  fetchPromise(`shops/${shopOrigin}/session`, { method: 'GET', headers }).then((payload) => {
    window.localStorage.setItem('cwb_jwt', payload.jwt);
  });

export const apiUpdateBar = (id, body) =>
  fetchPromise(`bars/${id}`, {
    method: 'PATCH',
    headers: getTokenHeader(),
    body,
  });

export const apiFetch = (url, props = {}) => apiCall('GET', url, props);
export const apiCreate = (url, props = {}) => apiCall('POST', url, props);
export const apiUpdate = (url, props = {}) => apiCall('PATCH', url, props);
export const apiDestroy = (url, props = {}) => apiCall('DELETE', url, props);
