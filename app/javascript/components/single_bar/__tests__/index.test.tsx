import React from 'react';
import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MockedProvider} from '@apollo/client/testing';
import {PolarisTestProvider} from '@shopify/polaris';
import {mockBarFields} from '../../../__mocks__/single_bar_mocks';
import {UPDATE_BAR} from '../../../utilities/graphql_tags';
import ToastContextProvider from '../../ToastContext';
import SingleBar from '..';

const {createdAt, updatedAt, ...singleBar} = mockBarFields;

const stubWindowScroll = () => {
  Object.defineProperty(window, 'scroll', {
    value: jest.fn(),
  });
};

it('triggers destroy modal on click', async () => {
  const confirmationText =
    'This will delete the current welcome bar and cannot be undone.';
  stubWindowScroll();
  render(
    <MockedProvider>
      <PolarisTestProvider>
        <ToastContextProvider>
          <SingleBar bar={singleBar} />
        </ToastContextProvider>
      </PolarisTestProvider>
    </MockedProvider>
  );

  expect(screen.queryByText(confirmationText)).not.toBeInTheDocument();

  userEvent.click(screen.getByText('Delete'));

  expect(await screen.findByText(confirmationText)).toBeInTheDocument();
});

it('reverts to last save on discard click', () => {
  stubWindowScroll();
  render(
    <MockedProvider>
      <PolarisTestProvider>
        <ToastContextProvider>
          <SingleBar bar={singleBar} />
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
  stubWindowScroll();
  render(
    <MockedProvider>
      <PolarisTestProvider>
        <ToastContextProvider>
          <SingleBar bar={singleBar} />
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

  stubWindowScroll();
  render(
    <MockedProvider mocks={[graphqlMock]}>
      <PolarisTestProvider>
        <ToastContextProvider>
          <SingleBar bar={singleBar} />
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
