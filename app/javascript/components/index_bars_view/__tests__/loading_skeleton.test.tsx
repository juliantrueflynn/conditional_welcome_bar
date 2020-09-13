import React from 'react';
import {screen, render} from '@testing-library/react';
import {PolarisTestProvider} from '@shopify/polaris';
import {PAGE_TITLE} from '../constants';
import LoadingSkeleton from '../loading_skeleton';

it('renders field groups', () => {
  render(
    <PolarisTestProvider>
      <LoadingSkeleton />
    </PolarisTestProvider>
  );

  expect(screen.getByText(PAGE_TITLE)).toBeInTheDocument();
});
