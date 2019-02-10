import Router from 'next/router';

const getBarLink = (bar) => {
  const { id } = bar || {};
  const pathname = '/single-bar';
  const query = { id };

  return [{ pathname, query }, `/bars/${id}`];
};

export const navigateToBar = (bar) => {
  const url = getBarLink(bar);
  Router.push(...url);
};
