import {gql} from '@apollo/client';

export * from './types/Bar';
export * from './types/UpdateBar';

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
