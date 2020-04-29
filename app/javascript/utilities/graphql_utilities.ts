import ApolloClient, { gql } from 'apollo-boost';

export const apolloClient = new ApolloClient({
  request: (operation): void => {
    const csrfMetaTag = document.querySelector('meta[name=csrf-token]');

    if (!csrfMetaTag) {
      return;
    }

    operation.setContext({
      headers: {
        'X-CSRF-Token': csrfMetaTag.getAttribute('content'),
      },
    });
  },
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
pageTemplates
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
  mutation UpdateBar {
    createBar {
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
