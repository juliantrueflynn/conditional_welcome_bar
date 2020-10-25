/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateBarInput } from "./../../../../types/graphqlGlobals";

// ====================================================
// GraphQL mutation operation: UpdateBar
// ====================================================

export interface UpdateBar_updateBar_bar {
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

export interface UpdateBar_updateBar_userErrors {
  __typename: "UserError";
  /**
   * Which input value this error came from
   */
  field: string[];
  /**
   * A description of the error
   */
  message: string;
}

export interface UpdateBar_updateBar {
  __typename: "UpdateBarPayload";
  bar: UpdateBar_updateBar_bar | null;
  userErrors: UpdateBar_updateBar_userErrors[];
}

export interface UpdateBar {
  updateBar: UpdateBar_updateBar | null;
}

export interface UpdateBarVariables {
  input: UpdateBarInput;
}
