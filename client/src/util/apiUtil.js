import { decamelizeKeys } from 'humps';

export const fetchPromise = (url, args) => fetch(url, {
  credentials: 'include',
  ...args,
}).then(response => (
  response.json().then(json => ({ json, response }))
)).then(({ json, response }) => {
  if (!response.ok) {
    throw json;
  }

  return json;
}).catch((error) => {
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
    const decamelizedBody = decamelizeKeys(props, { separator: '_' });
    args.body = JSON.stringify(decamelizedBody);
  }

  return fetchPromise(url, args);
};

export const apiFetch = (url, props = {}) => apiCall('GET', url, props);
export const apiCreate = (url, props = {}) => apiCall('POST', url, props);
export const apiUpdate = (url, props = {}) => apiCall('PATCH', url, props);
export const apiDestroy = url => fetchPromise(url, { method: 'DELETE' });
