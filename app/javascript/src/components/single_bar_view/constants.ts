export const FORM_SECTIONS = {
  editor: {
    title: 'Editor',
    description: 'Edit welcome bar title or content.',
  },
  visibility: {
    title: 'Visibility',
    description: 'Set visibility status and which templates welcomebar displays.',
  },
  link: {
    title: 'Link',
    description: 'Settings for welcome bar link.',
  },
  displayStyles: {
    title: 'Display styles',
    description: 'Style the overall appearance.',
  },
  textStyles: {
    title: 'Text styles',
    description: 'Style the welcome bar text.',
  },
  backgroundStyles: {
    title: 'Background styles',
    description: 'Style the background and or upload an image.',
  },
};

export const FORM_SECTION_IDS = Object.keys(FORM_SECTIONS) as Array<keyof typeof FORM_SECTIONS>;
