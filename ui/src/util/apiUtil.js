const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const apiFetch = (urlPath) => {
  const endpoint = `${process.env.REACT_APP_HOST_URL}/api/${urlPath}`;
  const options = { method: 'GET', headers, credentials: 'include' };

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
