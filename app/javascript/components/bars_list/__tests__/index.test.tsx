import React from 'react';
import BarsList from '..';
import {screen, render} from '@testing-library/react';
import {PolarisTestProvider} from '@shopify/polaris';
import {mockBarFields} from '../../../__mocks__/single_bar_mocks';

const mockBarsData = [
  {...mockBarFields, id: Math.random(), title: 'Bar #1'},
  {...mockBarFields, id: Math.random(), title: 'Bar #2'},
];

it('renders entries', async () => {
  render(
    <PolarisTestProvider>
      <React.Suspense fallback="Mocked for test">
        <BarsList bars={mockBarsData} />
      </React.Suspense>
    </PolarisTestProvider>
  );

  expect(screen.getByText(mockBarsData[0].title)).toBeInTheDocument();
  expect(screen.getByText(mockBarsData[1].title)).toBeInTheDocument();
});
