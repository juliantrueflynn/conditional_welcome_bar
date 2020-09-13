import {Bar} from '../../types';

export type BarProps = {
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
  [Bar.themeTemplates]: string[];
  [Bar.paddingY]: string;
  [Bar.paddingX]: string;
  [Bar.textAlign]: string;
  [Bar.textColor]: string;
  [Bar.fontSize]: string;
  [Bar.backgroundColor]: string;
  [Bar.__typename]?: string;
};

export type BarFields = Exclude<BarProps, 'id'>;

export {Bar};

export type {UserError} from '../../types';
