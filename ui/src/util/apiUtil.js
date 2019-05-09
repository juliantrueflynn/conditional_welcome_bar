import { decamelizeKeys } from 'humps';

const fetchPromise = (urlPath, args) => {
  const endpoint = `${process.env.REACT_APP_HOST_URL}/api/${urlPath}`;
  const options = { credentials: 'include', ...args };

  return fetch(endpoint, options)
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
};

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const apiCall = (method, url, props) => {
  const args = { method, headers };

  if (args.method === 'POST' || args.method === 'PATCH') {
    args.body = JSON.stringify(decamelizeKeys(props, { separator: '_' }));
  }

  return fetchPromise(url, args);
};

export const apiFetch = (url, props = {}) => apiCall('GET', url, props);
export const apiCreate = (url, props = {}) => apiCall('POST', url, props);
export const apiUpdate = (url, props = {}) => apiCall('PATCH', url, props);
export const apiDestroy = (url, props = {}) => apiCall('DELETE', url, props);

export const apiUpdateBar = (id, body) => fetchPromise(`bars/${id}`, { method: 'PATCH', body });
