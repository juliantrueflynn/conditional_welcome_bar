import React from 'react';
import {FORM_SECTIONS, FORM_SECTION_IDS} from '../../constants';
import FieldGroup from '../field_group';
import {screen, render} from '@testing-library/react';
import {PolarisTestProvider} from '@shopify/polaris';

test('renders title and description from constant', () => {
  FORM_SECTION_IDS.forEach((id) => {
    render(
      <PolarisTestProvider>
        <FieldGroup id={id}>
          <div>Render me</div>
        </FieldGroup>
      </PolarisTestProvider>
    );

    expect(screen.getByText(FORM_SECTIONS[id].title)).toBeInTheDocument();
    expect(screen.getByText(FORM_SECTIONS[id].description)).toBeInTheDocument();
  });
});
