import React from 'react';
import {screen, render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {enableFetchMocks} from 'jest-fetch-mock';
import {MockedProvider} from '@apollo/client/testing';
import {PolarisTestProvider} from '@shopify/polaris';
import {createMemoryHistory} from 'history';
import {Router, Route} from 'react-router';
import {mockBarFields} from '../../../__mocks__/single_bar_mocks';
import {DESTROY_BAR} from '../../../utilities/graphql_tags';
import ToastContextProvider from '../../ToastContext';
import ModalDestroyBar from '..';

const onClose = jest.fn();
const barId = mockBarFields.id;

const stubWindowScroll = () => {
  Object.defineProperty(window, 'scroll', {
    value: jest.fn(),
  });
};

const stubbedHistoryEntries = () =>
  createMemoryHistory({
    initialEntries: [`/bars/${mockBarFields.id}`],
  });

const mockGraphqlRequest = {
  query: DESTROY_BAR,
  variables: {input: {id: mockBarFields.id}},
};

it('goes to homepage on delete click', async () => {
  stubWindowScroll();
  enableFetchMocks();

  let deleteMutationCalled = false;
  const graphqlMock = {
    request: mockGraphqlRequest,
    result: () => {
      deleteMutationCalled = true;

      return {
        data: {bar: {...mockBarFields, id: barId.toString()}},
      };
    },
  };
  render(
    <MockedProvider mocks={[graphqlMock]} addTypename={false}>
      <Router history={stubbedHistoryEntries()}>
        <Route path="/bars/:barId">
          <PolarisTestProvider>
            <ToastContextProvider>
              <ModalDestroyBar isModalOpen barId={barId} onClose={jest.fn} />
            </ToastContextProvider>
          </PolarisTestProvider>
        </Route>
        <Route exact path="/">
          Mocked Homepage
        </Route>
      </Router>
    </MockedProvider>
  );

  expect(screen.queryByText('Mocked Homepage')).not.toBeInTheDocument();

  userEvent.click(screen.getByText('Delete'));

  await waitFor(() => expect(deleteMutationCalled).toBe(true));
  expect(screen.getByText('Mocked Homepage')).toBeInTheDocument();
});

it('does not delete if error present', async () => {
  stubWindowScroll();
  enableFetchMocks();

  const graphqlMock = {
    request: mockGraphqlRequest,
    error: new Error('forced network error'),
  };
  render(
    <MockedProvider mocks={[graphqlMock]} addTypename={false}>
      <Router history={stubbedHistoryEntries()}>
        <Route path="/bars/:barId">
          <PolarisTestProvider>
            <ToastContextProvider>
              <ModalDestroyBar isModalOpen barId={barId} onClose={onClose} />
            </ToastContextProvider>
          </PolarisTestProvider>
        </Route>
        <Route exact path="/">
          Mocked Homepage
        </Route>
      </Router>
    </MockedProvider>
  );

  userEvent.click(screen.getByText('Delete'));

  expect(screen.queryByText('Mocked Homepage')).not.toBeInTheDocument();
});

it('closes modal on cancel click', async () => {
  stubWindowScroll();
  enableFetchMocks();

  render(
    <MockedProvider>
      <Router history={stubbedHistoryEntries()}>
        <PolarisTestProvider>
          <ToastContextProvider>
            <ModalDestroyBar
              isModalOpen
              barId={mockBarFields.id}
              onClose={onClose}
            />
          </ToastContextProvider>
        </PolarisTestProvider>
      </Router>
    </MockedProvider>
  );

  userEvent.click(screen.getByText('Cancel'));

  expect(onClose).toHaveBeenCalledTimes(1);
});
