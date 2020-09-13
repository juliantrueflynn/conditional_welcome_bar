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

export type UserError = {
  readonly field: (keyof typeof Bar)[];
  readonly message: string;
};
