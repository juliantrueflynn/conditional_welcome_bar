import { decamelizeKeys } from 'humps';
import { getQueryObject } from './shopifyUtil';

const endpoint = (url) => `${process.env.REACT_APP_TUNNEL_URL}/api/${url}`;

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
  const jwt = window.localStorage.getItem('cwb_jwt');

  return { AUTHORIZATION: `Bearer ${jwt}` };
};

export const apiCall = (method, url, props) => {
  const args = {
    method,
    headers: { ...headers },
  };

  if (args.method === 'POST' || args.method === 'PATCH') {
    args.body = JSON.stringify(decamelizeKeys(props, { separator: '_' }));
  }

  return fetchPromise(url, args);
};

export const apiSetToken = () => {
  const { code, shop } = getQueryObject();

  if (!code) {
    fetchPromise(`shops/${shop}/session`, { method: 'GET', headers }).then((payload) => {
      if (payload.permissionUrl) {
        window.location = payload.permissionUrl;
      } else {
        // @TODO: Remove. This is temp solution to JWT.
        window.localStorage.setItem('cwb_jwt', payload.jwt);
      }
    });
  } else if (!window.localStorage.getItem('cwb_fetched')) {
    const query = { query: getQueryObject() };

    apiCreate(`shops/${shop}/session`, query).then((payload) => {
      // @TODO: Remove. This is temp solution to not double fetching.
      window.localStorage.setItem('cwb_fetched', 1);
    });
  }
};

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
