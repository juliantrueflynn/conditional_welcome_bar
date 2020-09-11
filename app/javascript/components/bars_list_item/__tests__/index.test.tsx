import React from 'react';
import BarsListItem from '..';
import {screen, render} from '@testing-library/react';
import {PolarisTestProvider} from '@shopify/polaris';

it('renders title, date, content', () => {
  const mockSingleBar = {
    id: '1',
    title: 'Some Title',
    content: 'Some content',
    createdAt: new Date().toString(),
    locale: 'en-US',
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
