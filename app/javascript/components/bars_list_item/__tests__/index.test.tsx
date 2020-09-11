import React from 'react';
import BarsListItem from '..';
import {screen, render} from '@testing-library/react';
import {PolarisTestProvider} from '@shopify/polaris';
import {mockBarFields} from '../../../__mocks__/single_bar_mocks';

it('renders title, date, content', () => {
  const mockSingleBar = {
    ...mockBarFields,
    locale: 'en-US',
    content: 'Some content',
  };
  render(
    <PolarisTestProvider>
      <BarsListItem {...mockSingleBar} />
    </PolarisTestProvider>
  );

  expect(screen.getByText(mockSingleBar.title)).toBeInTheDocument();
  expect(screen.getByText(mockSingleBar.content)).toBeInTheDocument();
  expect(screen.getByText('Just now')).toBeInTheDocument();
});
