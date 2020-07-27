import React from 'react';
import BarsList from '..';
import { render } from '@testing-library/react';
import { PolarisTestProvider } from '@shopify/polaris';
import { mockBarFields } from '../../../__mocks__/single_bar_mocks';
import '@testing-library/jest-dom/extend-expect';

const mockBarsData = [
  { ...mockBarFields, id: Math.random(), title: 'Bar #1' },
  { ...mockBarFields, id: Math.random(), title: 'Bar #2' },
];

it('renders entries', () => {
  const { findByText } = render(
    <PolarisTestProvider>
      <React.Suspense fallback="Mocked for test">
        <BarsList bars={mockBarsData} />
      </React.Suspense>
    </PolarisTestProvider>
  );

  mockBarsData.forEach(async (welcomeBar) => {
    expect(await findByText(welcomeBar.title)).toBeInTheDocument();
  });
});
