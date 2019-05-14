import { gql } from 'apollo-boost';

export const GET_ALL_BARS = gql`
  query Bars($shopifyDomain: String) {
    bars(shopifyDomain: $shopifyDomain) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export const GET_SINGLE_BAR = gql`
  query Bar($id: String!) {
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
      pageTemplates
      hasCloseButton
      paddingY
      paddingX
      textAlign
      textOpacity
      textColor
      fontSize
      backgroundColor
      backgroundOpacity
      backgroundImage
      backgroundImageRepeat
      backgroundImageSizeX
      backgroundImageSizeY
      backgroundImagePositionX
      backgroundImagePositionY
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
        pageTemplates
        hasCloseButton
        paddingY
        paddingX
        textAlign
        textOpacity
        textColor
        fontSize
        backgroundColor
        backgroundOpacity
        backgroundImage
        backgroundImageRepeat
        backgroundImageSizeX
        backgroundImageSizeY
        backgroundImagePositionX
        backgroundImagePositionY
      }
      errors
    }
  }
`;
