/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Bar
// ====================================================

export interface Bar_bar {
  __typename: "Bar";
  title: string;
  content: string;
  url: string | null;
  placement: string | null;
  isActive: boolean;
  isSticky: boolean;
  isFullWidthLink: boolean;
  isNewTabUrl: boolean;
  themeTemplates: string[];
  hasCloseButton: boolean;
  paddingY: string | null;
  paddingX: string | null;
  textAlign: string | null;
  textColor: string | null;
  fontSize: string | null;
  backgroundColor: string | null;
}

export interface Bar {
  bar: Bar_bar | null;
}

export interface BarVariables {
  id: string;
}
