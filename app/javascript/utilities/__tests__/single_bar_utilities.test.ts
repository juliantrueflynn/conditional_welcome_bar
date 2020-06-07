import { barFalseMap } from '../single_bar_utilities';

describe('barFalseMap', () => {
  it('renders all bar fields as false', () => {
    const result = barFalseMap;

    expect(result).toMatchObject({
      id: false,
      shopId: false,
      title: false,
      content: false,
      url: false,
      backgroundColor: false,
      placement: false,
      textAlign: false,
      isActive: false,
      isSticky: false,
      isFullWidthLink: false,
      hasCloseButton: false,
      isNewTabUrl: false,
      paddingY: false,
      paddingX: false,
      pageTemplates: false,
      textColor: false,
      fontSize: false,
      createdAt: false,
      updatedAt: false,
      __typename: false,
    });
  });
});
