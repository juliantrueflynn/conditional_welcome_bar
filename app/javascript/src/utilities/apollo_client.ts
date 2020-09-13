import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from '@apollo/client';

const httpLink = new HttpLink();

const getCsrfToken = (): string | null => {
  const csrfMetaTag = document.querySelector('meta[name=csrf-token]');
  const csrfToken = csrfMetaTag && csrfMetaTag.getAttribute('content');

  return csrfToken || null;
};

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({headers = {}}) => ({
    headers: {
      ...headers,
      'X-CSRF-Token': getCsrfToken(),
    },
  }));

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});
