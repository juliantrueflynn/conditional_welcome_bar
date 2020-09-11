import React from 'react';
import {screen, render} from '@testing-library/react';
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
import SingleBar from '..';

const {createdAt, updatedAt, ...singleBar} = mockBarFields;

it('renders all field groups', async () => {
  render(
    <MockedProvider>
      <PolarisTestProvider>
        <ToastContextProvider>
          <SingleBar bar={singleBar} openModal={jest.fn} />
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
          <SingleBar bar={singleBar} openModal={jest.fn} />
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
          <SingleBar bar={singleBar} openModal={jest.fn} />
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

it('renders field errors from API', async () => {
  const {__typename, ...requestVariables} = singleBar;
  const graphqlMock = {
    request: {
      query: UPDATE_BAR,
      variables: {
        input: {
          ...requestVariables,
          title: `${singleBar.title}some text`,
        },
      },
    },
    result: {
      data: {
        updateBar: {
          bar: singleBar,
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
          <SingleBar bar={singleBar} openModal={jest.fn} />
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
