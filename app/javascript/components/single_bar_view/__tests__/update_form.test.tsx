import React from 'react';
import {screen, render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MockedProvider} from '@apollo/client/testing';
import {PolarisTestProvider} from '@shopify/polaris';
import {
  FORM_SECTIONS,
  FORM_SECTION_IDS,
} from '../../../constants/form_sections';
import {mockBarFields} from '../../../__mocks__/single_bar_mocks';
import {UPDATE_BAR} from '../../../utilities/graphql_tags';
import ToastContextProvider from '../../ToastContext';
import UpdateForm from '../update_form';

const {__typename, ...graphqlRequestVariables} = mockBarFields;
const updateMutationVariables = {id: '1', ...graphqlRequestVariables};

it('renders all field groups', async () => {
  render(
    <MockedProvider>
      <PolarisTestProvider>
        <ToastContextProvider>
          <UpdateForm barId="1" bar={mockBarFields} openModal={jest.fn} />
        </ToastContextProvider>
      </PolarisTestProvider>
    </MockedProvider>
  );

  for (const id of FORM_SECTION_IDS) {
    expect(
      await screen.findByText(FORM_SECTIONS[id].title)
    ).toBeInTheDocument();
    expect(screen.getByText(FORM_SECTIONS[id].description)).toBeInTheDocument();
  }
});

it('reverts to last save on discard click', () => {
  render(
    <MockedProvider>
      <PolarisTestProvider>
        <ToastContextProvider>
          <UpdateForm barId="1" bar={mockBarFields} openModal={jest.fn} />
        </ToastContextProvider>
      </PolarisTestProvider>
    </MockedProvider>
  );
  const oldTitle = mockBarFields.title;
  const titleField = screen.getByPlaceholderText('Title');

  expect(titleField).toHaveValue(oldTitle);

  userEvent.type(titleField, ' Added Text');

  expect(titleField).toHaveValue(`${oldTitle} Added Text`);

  userEvent.click(screen.getByText('Discard'));

  expect(titleField).toHaveValue(oldTitle);
});

it('disables Save button unless changes made', () => {
  render(
    <MockedProvider>
      <PolarisTestProvider>
        <ToastContextProvider>
          <UpdateForm barId="1" bar={mockBarFields} openModal={jest.fn} />
        </ToastContextProvider>
      </PolarisTestProvider>
    </MockedProvider>
  );
  const saveButton = screen.getByText('Save').closest('button');

  expect(saveButton).toBeDisabled();

  userEvent.type(screen.getByPlaceholderText('Title'), '1');

  expect(saveButton).toBeEnabled();

  userEvent.type(screen.getByPlaceholderText('Title'), '{backspace}');

  expect(saveButton).toBeDisabled();
});

it('updates on submit and sets old state to new state', async () => {
  let hasUpdateMutationCalled = false;
  const graphqlMock = {
    request: {
      query: UPDATE_BAR,
      variables: {
        input: {
          ...updateMutationVariables,
          title: `${mockBarFields.title}some text`,
        },
      },
    },
    result: () => {
      hasUpdateMutationCalled = true;

      return {
        data: {
          updateBar: {bar: mockBarFields, __typename: 'updateBar'},
        },
      };
    },
  };

  render(
    <MockedProvider mocks={[graphqlMock]}>
      <PolarisTestProvider>
        <ToastContextProvider>
          <UpdateForm barId="1" bar={mockBarFields} openModal={jest.fn} />
        </ToastContextProvider>
      </PolarisTestProvider>
    </MockedProvider>
  );

  userEvent.type(screen.getByPlaceholderText('Title'), 'some text');
  userEvent.click(screen.getByText('Save'));

  await waitFor(() => expect(hasUpdateMutationCalled).toBe(true));
  expect(screen.getByText('Save').closest('button')).toBeDisabled();
  expect(screen.getByPlaceholderText('Title')).toHaveValue(
    `${mockBarFields.title}some text`
  );
});

it('renders field errors from API', async () => {
  const graphqlMock = {
    request: {
      query: UPDATE_BAR,
      variables: {
        input: {
          ...updateMutationVariables,
          title: `${mockBarFields.title}some text`,
        },
      },
    },
    result: {
      data: {
        updateBar: {
          bar: mockBarFields,
          userErrors: [
            {
              field: ['title'],
              message: 'Some field error message',
              __typename: 'UserError',
            },
          ],
          __typename: 'updateBar',
        },
      },
    },
  };

  render(
    <MockedProvider mocks={[graphqlMock]}>
      <PolarisTestProvider>
        <ToastContextProvider>
          <UpdateForm barId="1" bar={mockBarFields} openModal={jest.fn} />
        </ToastContextProvider>
      </PolarisTestProvider>
    </MockedProvider>
  );

  userEvent.type(screen.getByPlaceholderText('Title'), 'some text');
  userEvent.click(screen.getByText('Save'));

  expect(
    await screen.findByText('Some field error message')
  ).toBeInTheDocument();
});
