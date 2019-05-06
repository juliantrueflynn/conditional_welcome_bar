import queryString from 'query-string';

export const getQueryObject = () => queryString.parse(window.location.search);

const getShopOrigin = () => {
  const { shop } = getQueryObject();

  return shop;
};

export const isUserInAdmin = () => !!getQueryObject().shop;

export const shopOrigin = () => getShopOrigin();
