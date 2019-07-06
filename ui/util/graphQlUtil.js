import { gql } from 'apollo-boost'

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
backgroundImage
backgroundImageRepeat
backgroundImageSizeX
backgroundImageSizeY
backgroundImagePositionX
backgroundImagePositionY
`

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
`

export const GET_SINGLE_BAR = gql`
  query Bar($id: ID!) {
    bar(id: $id) {
      id
      ${DEFAULT_BAR_ATTRIBUTES}
    }
  }
`

export const CREATE_BAR = gql`
  mutation UpdateBar($input: CreateBarInput!) {
    createBar(input: $input) {
      bar {
        id
      }
    }
  }
`

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
`

export const DESTROY_BAR = gql`
  mutation DestroyBar($input: DestroyBarInput!) {
    destroyBar(input: $input) {
      bar {
        id
      }
    }
  }
`
