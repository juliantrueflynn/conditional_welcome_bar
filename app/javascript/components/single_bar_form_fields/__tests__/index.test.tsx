import React, { Suspense } from 'react';
import {
  FORM_SECTIONS,
  FORM_SECTION_IDS,
} from '../../../constants/form_sections';
import SingleBarFormFields from '..';
import { render } from '@testing-library/react';
import { PolarisTestProvider } from '@shopify/polaris';
import { BarErrorPayload } from '../../../types/bar';
import { barFalseMap } from '../../../utilities/single_bar_utilities';
import { BarFormProps } from '../../../types/fields';
import { mockBarFields } from '../../../__mocks__/single_bar_mocks';

it('renders all field groups', async () => {
  const errors: BarErrorPayload = {};
  const dirtyValues: BarFormProps = barFalseMap;

  const subject = await render(
    <PolarisTestProvider>
      <Suspense fallback="Mocked for test">
        <SingleBarFormFields
          updateFieldValue={jest.fn()}
          fields={mockBarFields}
          errors={errors}
          dirtyValues={dirtyValues}
        />
      </Suspense>
    </PolarisTestProvider>
  );

  FORM_SECTION_IDS.forEach(async (id) => {
    const groupTitle = subject.getByText(FORM_SECTIONS[id].title);
    const groupDescription = subject.getByText(FORM_SECTIONS[id].description);

    expect(groupTitle).not.toBeNull();
    expect(groupDescription).not.toBeNull();
  });
});
