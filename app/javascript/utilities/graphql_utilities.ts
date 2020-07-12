import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    new ApolloLink((operation, forward) => {
      const csrfMetaTag = document.querySelector('meta[name=csrf-token]');

      operation.setContext({
        headers: {
          'X-CSRF-Token': csrfMetaTag && csrfMetaTag.getAttribute('content'),
        },
      });

      return forward(operation);
    }),
    new HttpLink({ uri: '/graphql' }),
  ]),
  cache: new InMemoryCache(),
});

const DEFAULT_BAR_ATTRIBUTES = `
title
content
url
placement
isActive
isSticky
isFullWidthLink
isNewTabUrl
themeTemplates
hasCloseButton
paddingY
paddingX
textAlign
textColor
fontSize
backgroundColor
`;

export const GET_ALL_BARS = gql`
  {
    bars {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export const GET_SINGLE_BAR = gql`
  query Bar($id: ID!) {
    bar(id: $id) {
      id
      ${DEFAULT_BAR_ATTRIBUTES}
    }
  }
`;

export const CREATE_BAR = gql`
  mutation CreateBar {
    createBar(input: {}) {
      bar {
        id
      }
    }
  }
`;

export const UPDATE_BAR = gql`
  mutation updateBar($input: UpdateBarInput!) {
    updateBar(input: $input) {
      bar {
        ${DEFAULT_BAR_ATTRIBUTES}
      }
      errors {
        ${DEFAULT_BAR_ATTRIBUTES}
      }
    }
  }
`;

export const DESTROY_BAR = gql`
  mutation DestroyBar($input: DestroyBarInput!) {
    destroyBar(input: $input) {
      bar {
        id
      }
    }
  }
`;
