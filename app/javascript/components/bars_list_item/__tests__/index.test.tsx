import React from 'react';
import BarsListItem from '..';
import { render } from '@testing-library/react';
import { PolarisTestProvider } from '@shopify/polaris';
import { mockBarFields } from '../../../__mocks__/single_bar_mocks';
import '@testing-library/jest-dom/extend-expect';

it('renders title, date, content', () => {
  const mockSingleBar = {
    ...mockBarFields,
    locale: 'en-US',
    content: 'Some content',
  };
  const { getByText } = render(
    <PolarisTestProvider>
      <BarsListItem {...mockSingleBar} />
    </PolarisTestProvider>
  );

  const title = getByText(mockSingleBar.title);
  const content = getByText(mockSingleBar.content);
  const date = getByText('Just now');

  expect(title).toBeInTheDocument();
  expect(content).toBeInTheDocument();
  expect(date).toBeInTheDocument();
});
