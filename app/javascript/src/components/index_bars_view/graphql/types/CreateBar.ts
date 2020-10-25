/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateBar
// ====================================================

export interface CreateBar_createBar_bar {
  __typename: "Bar";
  id: string;
}

export interface CreateBar_createBar {
  __typename: "CreateBarPayload";
  bar: CreateBar_createBar_bar | null;
}

export interface CreateBar {
  createBar: CreateBar_createBar | null;
}
