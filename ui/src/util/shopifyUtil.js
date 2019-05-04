import queryString from 'query-string';

export const getQueryObject = () => queryString.parse(window.location.search);

const getShopOrigin = () => {
  const { localStorage } = window;
  const { shop } = getQueryObject();

  if (localStorage.getItem('cwb_shop')) {
    return localStorage.getItem('cwb_shop');
  }

  localStorage.setItem('cwb_shop', shop);

  return shop;
};

export const isUserInAdmin = () => !!getQueryObject().shop;

export const shopOrigin = () => getShopOrigin();
