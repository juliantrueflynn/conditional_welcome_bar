import {getShopOrigin} from '../shopify';

export const getSingleBarUrlPath = (id: string): string => {
  const search = window.location.search;

  if (!search.includes('shop=')) {
    const shop = getShopOrigin();

    return `/bars/${id}?shop=${shop}`;
  }

  return `/bars/${id}${search}`;
};
