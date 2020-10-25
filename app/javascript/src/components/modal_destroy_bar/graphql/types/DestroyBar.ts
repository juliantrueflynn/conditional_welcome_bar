/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DestroyBarInput } from "./../../../../types/graphqlGlobals";

// ====================================================
// GraphQL mutation operation: DestroyBar
// ====================================================

export interface DestroyBar_destroyBar_bar {
  __typename: "Bar";
  id: string;
}

export interface DestroyBar_destroyBar {
  __typename: "DestroyBarPayload";
  bar: DestroyBar_destroyBar_bar | null;
}

export interface DestroyBar {
  destroyBar: DestroyBar_destroyBar | null;
}

export interface DestroyBarVariables {
  input: DestroyBarInput;
}
