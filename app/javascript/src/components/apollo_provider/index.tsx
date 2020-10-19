import React from 'react';
import {
  ApolloProvider as ApolloClientProvider,
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from '@apollo/client';
import {authenticatedFetch, createShopifyAppBridge} from '../../../shopify_app';

const appBridge = createShopifyAppBridge();

const getCsrfToken = (): string => {
  const csrfMetaTag = document.querySelector('meta[name=csrf-token]');

  return csrfMetaTag?.getAttribute('content') || '';
};

const httpLink = new HttpLink({
  credentials: 'same-origin',
  fetch: appBridge ? authenticatedFetch(appBridge) : window.fetch,
});

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

type Props = {
  children: React.ReactNode;
};

const ApolloProvider = ({children}: Props) => {
  return (
    <ApolloClientProvider client={apolloClient}>
      <>{children}</>
    </ApolloClientProvider>
  );
};

export default ApolloProvider;
