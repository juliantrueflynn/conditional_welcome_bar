import queryString from 'query-string';

export const getQueryObject = queryString.parse(window.location.search);

export const getShopOrigin = getQueryObject && getQueryObject.shop;