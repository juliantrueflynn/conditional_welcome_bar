import {
  gql,
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
  operation.setContext(({ headers = {} }) => ({
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
  mutation UpdateBar($input: UpdateBarInput!) {
    updateBar(input: $input) {
      bar {
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
      }
      userErrors {
        field
        message
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
