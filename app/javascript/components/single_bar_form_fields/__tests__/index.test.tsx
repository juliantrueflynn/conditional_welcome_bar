import React from 'react';
import {
  FORM_SECTIONS,
  FORM_SECTION_IDS,
} from '../../../constants/form_sections';
import SingleBarFormFields from '..';
import { screen, render } from '@testing-library/react';
import { PolarisTestProvider } from '@shopify/polaris';
import { BarErrorPayload } from '../../../types/bar';
import { barFalseMap } from '../../../utilities/single_bar_utilities';
import { BarFormProps } from '../../../types/fields';
import { mockBarFields } from '../../../__mocks__/single_bar_mocks';

it('renders all field groups', async () => {
  const errors: BarErrorPayload = {};
  const dirtyValues: BarFormProps = barFalseMap;

  render(
    <PolarisTestProvider>
      <SingleBarFormFields
        updateFieldValue={jest.fn()}
        fields={mockBarFields}
        errors={errors}
        dirtyValues={dirtyValues}
      />
    </PolarisTestProvider>
  );

  for (const id of FORM_SECTION_IDS) {
    expect(
      await screen.findByText(FORM_SECTIONS[id].title)
    ).toBeInTheDocument();
    expect(screen.getByText(FORM_SECTIONS[id].description)).toBeInTheDocument();
  }
});
