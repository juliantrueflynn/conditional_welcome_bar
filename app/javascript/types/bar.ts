export enum Bar {
  id = 'id',
  shopId = 'shopId',
  title = 'title',
  content = 'content',
  isActive = 'isActive',
  url = 'url',
  placement = 'placement',
  isNewTabUrl = 'isNewTabUrl',
  isFullWidthLink = 'isFullWidthLink',
  hasCloseButton = 'hasCloseButton',
  isSticky = 'isSticky',
  updatedAt = 'updatedAt',
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
  [Bar.id]: number;
  [Bar.shopId]: number;
  [Bar.title]: string;
  [Bar.content]: string;
  [Bar.isActive]: boolean;
  [Bar.url]: string;
  [Bar.placement]: string;
  [Bar.isNewTabUrl]: boolean;
  [Bar.isFullWidthLink]: boolean;
  [Bar.hasCloseButton]: boolean;
  [Bar.isSticky]: boolean;
  [Bar.updatedAt]: string;
  [Bar.createdAt]: string;
  [Bar.themeTemplates]: string[];
  [Bar.paddingY]: string;
  [Bar.paddingX]: string;
  [Bar.textAlign]: string;
  [Bar.textColor]: string;
  [Bar.fontSize]: string;
  [Bar.backgroundColor]: string;
  [Bar.__typename]: string;
};

export type BarPayload = {
  createBar: {
    bar: BarType | null;
    errors: BarErrorPayload | null;
  };
  destroyBar: {
    bar: BarType | null;
    errors: BarErrorPayload | null;
  };
  updateBar: {
    bar: BarType | null;
    errors: BarErrorPayload | null;
  };
};

export type BarErrorPayload = {
  readonly [key in keyof typeof Bar]?: string[];
};
