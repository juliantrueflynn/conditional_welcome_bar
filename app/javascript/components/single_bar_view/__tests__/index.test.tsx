import {enableFetchMocks} from 'jest-fetch-mock';
import React from 'react';
import {screen, render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MockedProvider} from '@apollo/client/testing';
import {PolarisTestProvider} from '@shopify/polaris';
import {createMemoryHistory} from 'history';
import {mockBarFields} from '../../../__mocks__/single_bar_mocks';
import {GET_SINGLE_BAR} from '../../../utilities/graphql_tags';
import {Router, Route} from 'react-router';
import ToastContextProvider from '../../ToastContext';
import SingleBarView from '..';

const {__typename, createdAt, updatedAt, ...singleBarMock} = mockBarFields;
const stubbedHistoryEntries = createMemoryHistory({
  initialEntries: [`/bars/${singleBarMock.id}`],
});
const mockGraphqlRequest = {
  query: GET_SINGLE_BAR,
  variables: {id: singleBarMock.id},
};

const stubWindowScroll = () => {
  Object.defineProperty(window, 'scroll', {
    value: jest.fn(),
  });
};

it('renders single bar', async () => {
  enableFetchMocks();
  stubWindowScroll();
  const graphqlMock = {
    request: mockGraphqlRequest,
    result: {
      data: {bar: {...singleBarMock, id: singleBarMock.id}},
    },
  };
  render(
    <MockedProvider mocks={[graphqlMock]} addTypename={false}>
      <Router history={stubbedHistoryEntries}>
        <PolarisTestProvider>
          <ToastContextProvider>
            <Route path="/bars/:barId">
              <SingleBarView />
            </Route>
          </ToastContextProvider>
        </PolarisTestProvider>
      </Router>
    </MockedProvider>
  );

  expect(await screen.findByText(singleBarMock.title)).toBeInTheDocument();
});

it('triggers destroy modal on click', async () => {
  enableFetchMocks();
  stubWindowScroll();
  const confirmationText =
    'This will delete the current welcome bar and cannot be undone.';
  const graphqlMock = {
    request: mockGraphqlRequest,
    result: {
      data: {bar: singleBarMock},
    },
  };
  render(
    <MockedProvider mocks={[graphqlMock]} addTypename={false}>
      <Router history={stubbedHistoryEntries}>
        <PolarisTestProvider>
          <ToastContextProvider>
            <Route path="/bars/:barId">
              <SingleBarView />
            </Route>
          </ToastContextProvider>
        </PolarisTestProvider>
      </Router>
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.queryByText(confirmationText)).not.toBeInTheDocument();
  });

  userEvent.click(screen.getByText('Delete'));

  expect(await screen.findByText(confirmationText)).toBeInTheDocument();
});

it('renders error instead of entry', async () => {
  stubWindowScroll();
  enableFetchMocks();
  const graphqlMock = {
    request: mockGraphqlRequest,
    error: new Error('forced network error'),
  };
  render(
    <MockedProvider mocks={[graphqlMock]} addTypename={false}>
      <Router history={stubbedHistoryEntries}>
        <PolarisTestProvider>
          <ToastContextProvider>
            <Route path="/bars/:barId">
              <SingleBarView />
            </Route>
          </ToastContextProvider>
        </PolarisTestProvider>
      </Router>
    </MockedProvider>
  );
  const errorText = 'Reload this page';

  expect(await screen.findByText(errorText)).toBeInTheDocument();
  expect(screen.queryByText(singleBarMock.title)).not.toBeInTheDocument();
});

it('renders missing state if result blank', async () => {
  stubWindowScroll();
  enableFetchMocks();
  const graphqlMock = {
    request: mockGraphqlRequest,
    result: {
      data: {bar: null},
    },
  };
  render(
    <MockedProvider mocks={[graphqlMock]} addTypename={false}>
      <Router history={stubbedHistoryEntries}>
        <PolarisTestProvider>
          <ToastContextProvider>
            <Route path="/bars/:barId">
              <SingleBarView />
            </Route>
          </ToastContextProvider>
        </PolarisTestProvider>
      </Router>
    </MockedProvider>
  );
  const missingText = 'The page you’re looking for couldn’t be found';

  expect(await screen.findByText(missingText)).toBeInTheDocument();
});
