import {gql} from '@apollo/client';

export const GET_ALL_BARS = gql`
  query Bars {
    bars {
      id
      title
      content
      createdAt
    }
  }
`;

export const GET_SINGLE_BAR = gql`
  query Bar($id: ID!) {
    bar(id: $id) {
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
