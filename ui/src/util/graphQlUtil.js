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
      backgroundImage
      backgroundImageRepeat
      backgroundImageSizeX
      backgroundImageSizeY
      backgroundImagePositionX
      backgroundImagePositionY
      createdAt
      updatedAt
    }
  }
`;
