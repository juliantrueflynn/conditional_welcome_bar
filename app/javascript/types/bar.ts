export enum Bar {
  id = 'id',
  title = 'title',
  content = 'content',
  isActive = 'isActive',
  url = 'url',
  placement = 'placement',
  isNewTabUrl = 'isNewTabUrl',
  isFullWidthLink = 'isFullWidthLink',
  hasCloseButton = 'hasCloseButton',
  isSticky = 'isSticky',
  createdAt = 'createdAt',
  themeTemplates = 'themeTemplates',
  paddingY = 'paddingY',
  paddingX = 'paddingX',
  textAlign = 'textAlign',
  textColor = 'textColor',
  fontSize = 'fontSize',
  backgroundColor = 'backgroundColor',
  __typename = '__typename',
}

export type BarType = {
  [Bar.id]: string;
  [Bar.title]: string;
  [Bar.content]: string;
  [Bar.isActive]: boolean;
  [Bar.url]: string;
  [Bar.placement]: string;
  [Bar.isNewTabUrl]: boolean;
  [Bar.isFullWidthLink]: boolean;
  [Bar.hasCloseButton]: boolean;
  [Bar.isSticky]: boolean;
  [Bar.updatedAt]?: string;
  [Bar.createdAt]?: string;
  [Bar.themeTemplates]: string[];
  [Bar.paddingY]: string;
  [Bar.paddingX]: string;
  [Bar.textAlign]: string;
  [Bar.textColor]: string;
  [Bar.fontSize]: string;
  [Bar.backgroundColor]: string;
  [Bar.__typename]?: string;
};

export type UserError = {
  readonly field: (keyof typeof Bar)[];
  readonly message: string;
};

export type BarEntryProps = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export type BarMutationPayload = {
  bar?: BarType;
  userErrors?: UserError[];
};
