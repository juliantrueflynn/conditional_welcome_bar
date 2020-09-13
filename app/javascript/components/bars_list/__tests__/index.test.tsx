import React from 'react';
import BarsList from '..';
import {screen, render} from '@testing-library/react';
import {PolarisTestProvider} from '@shopify/polaris';

const createdAt = new Date().toString();
const mockBarsData = [
  {id: '1', title: 'Bar #1', content: 'Some content #1', createdAt},
  {id: '2', title: 'Bar #2', content: 'Some content #2', createdAt},
];

it('renders entries', async () => {
  render(
    <PolarisTestProvider>
      <BarsList bars={mockBarsData} />
    </PolarisTestProvider>
  );

  expect(screen.getByText(mockBarsData[0].title)).toBeInTheDocument();
  expect(screen.getByText(mockBarsData[0].content)).toBeInTheDocument();
  expect(screen.getByText(mockBarsData[1].title)).toBeInTheDocument();
  expect(screen.getByText(mockBarsData[1].content)).toBeInTheDocument();
});
