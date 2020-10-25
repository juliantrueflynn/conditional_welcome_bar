import React from 'react';
import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {PolarisTestProvider} from '@shopify/polaris';
import {FORM_SECTIONS, FORM_SECTION_IDS} from '../constants';
import {Bar_bar} from '../graphql';
import {mockBarFields} from '../../../test_utilities/single_bar_mocks';
import ToastContextProvider from '../../toast_context';
import UpdateForm from '../update_form';
import ApolloProvider from '../../apollo_provider';

const bar = {...mockBarFields, __typename: 'Bar'} as Bar_bar;

test('renders all field groups', async () => {
  render(
    <ApolloProvider>
      <PolarisTestProvider>
        <ToastContextProvider>
          <UpdateForm barId="1" bar={bar} openModal={jest.fn} />
        </ToastContextProvider>
      </PolarisTestProvider>
    </ApolloProvider>
  );

  for (const id of FORM_SECTION_IDS) {
    expect(await screen.findByText(FORM_SECTIONS[id].title)).toBeInTheDocument();
    expect(screen.getByText(FORM_SECTIONS[id].description)).toBeInTheDocument();
  }
});

test('reverts to last save on discard click', () => {
  render(
    <ApolloProvider>
      <PolarisTestProvider>
        <ToastContextProvider>
          <UpdateForm barId="1" bar={bar} openModal={jest.fn} />
        </ToastContextProvider>
      </PolarisTestProvider>
    </ApolloProvider>
  );
  const oldTitle = mockBarFields.title;
  const titleField = screen.getByPlaceholderText('Title');

  expect(titleField).toHaveValue(oldTitle);
  userEvent.type(titleField, ' Added Text');
  expect(titleField).toHaveValue(`${oldTitle} Added Text`);
  userEvent.click(screen.getByText('Discard'));
  expect(titleField).toHaveValue(oldTitle);
});

test('disables Save button unless changes made', () => {
  render(
    <ApolloProvider>
      <PolarisTestProvider>
        <ToastContextProvider>
          <UpdateForm barId="1" bar={bar} openModal={jest.fn} />
        </ToastContextProvider>
      </PolarisTestProvider>
    </ApolloProvider>
  );
  const saveButton = screen.getByText('Save').closest('button');

  expect(saveButton).toBeDisabled();
  userEvent.type(screen.getByPlaceholderText('Title'), '1');
  expect(saveButton).toBeEnabled();
  userEvent.type(screen.getByPlaceholderText('Title'), '{backspace}');
  expect(saveButton).toBeDisabled();
});
