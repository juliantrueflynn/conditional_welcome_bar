import React from 'react';
import {
  FORM_SECTIONS,
  FORM_SECTION_IDS,
} from '../../../constants/form_sections';
import FieldGroup from '../field_group';
import { render } from '@testing-library/react';
import { PolarisTestProvider } from '@shopify/polaris';

it('renders title and description from constant', () => {
  FORM_SECTION_IDS.forEach((id) => {
    const { getByText } = render(
      <PolarisTestProvider>
        <FieldGroup id={id}>
          <div>Render me</div>
        </FieldGroup>
      </PolarisTestProvider>
    );

    const subjectTitle = getByText(FORM_SECTIONS[id].title);
    const subjectDescription = getByText(FORM_SECTIONS[id].description);

    expect(subjectTitle).not.toBeNull();
    expect(subjectDescription).not.toBeNull();
  });
});
