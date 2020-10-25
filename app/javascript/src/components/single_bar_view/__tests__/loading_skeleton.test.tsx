import React from 'react';
import {FORM_SECTIONS, FORM_SECTION_IDS} from '../constants';
import {screen, render} from '@testing-library/react';
import {PolarisTestProvider} from '@shopify/polaris';
import LoadingSkeleton from '../loading_skeleton';

test('renders field groups', () => {
  render(
    <PolarisTestProvider>
      <LoadingSkeleton />
    </PolarisTestProvider>
  );

  for (const id of FORM_SECTION_IDS) {
    expect(screen.getByText(FORM_SECTIONS[id].title)).toBeInTheDocument();
    expect(screen.getByText(FORM_SECTIONS[id].description)).toBeInTheDocument();
  }
});
