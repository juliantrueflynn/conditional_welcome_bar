import { enableFetchMocks } from 'jest-fetch-mock';
import React from 'react';
import SingleBarView from '..';
import { screen, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { PolarisTestProvider } from '@shopify/polaris';
import { createMemoryHistory } from 'history';
import { mockBarFields } from '../../../__mocks__/single_bar_mocks';
import { GET_SINGLE_BAR } from '../../../utilities/graphql_tags';
import { Router, Route } from 'react-router';

const { __typename, createdAt, updatedAt, ...singleBarMock } = mockBarFields;
const stubbedHistoryEntries = createMemoryHistory({
  initialEntries: [`/bars/${singleBarMock.id}`],
});
const mockGraphqlRequest = {
  query: GET_SINGLE_BAR,
  variables: { id: singleBarMock.id.toString() },
};

it('renders single bar', async () => {
  enableFetchMocks();
  const graphqlMock = {
    request: mockGraphqlRequest,
    result: {
      data: { bar: { ...singleBarMock, id: singleBarMock.id.toString() } },
    },
  };
  render(
    <MockedProvider mocks={[graphqlMock]} addTypename={false}>
      <Router history={stubbedHistoryEntries}>
        <PolarisTestProvider>
          <Route path="/bars/:barId">
            <React.Suspense fallback="Mocked for test">
              <SingleBarView />
            </React.Suspense>
          </Route>
        </PolarisTestProvider>
      </Router>
    </MockedProvider>
  );

  expect(await screen.findByText(singleBarMock.title)).toBeInTheDocument();
});

it('renders error instead of entry', async () => {
  enableFetchMocks();
  const graphqlMock = {
    request: mockGraphqlRequest,
    error: new Error('forced network error'),
  };
  render(
    <MockedProvider mocks={[graphqlMock]} addTypename={false}>
      <Router history={stubbedHistoryEntries}>
        <PolarisTestProvider>
          <Route path="/bars/:barId">
            <React.Suspense fallback="Mocked for test">
              <SingleBarView />
            </React.Suspense>
          </Route>
        </PolarisTestProvider>
      </Router>
    </MockedProvider>
  );
  const errorText = 'Reload this page';

  expect(await screen.findByText(errorText)).toBeInTheDocument();
  expect(screen.queryByText(singleBarMock.title)).not.toBeInTheDocument();
});

it('renders missing state if result blank', async () => {
  enableFetchMocks();
  const graphqlMock = {
    request: mockGraphqlRequest,
    result: {
      data: { bar: null },
    },
  };
  render(
    <MockedProvider mocks={[graphqlMock]} addTypename={false}>
      <Router history={stubbedHistoryEntries}>
        <PolarisTestProvider>
          <Route path="/bars/:barId">
            <React.Suspense fallback="Mocked for test">
              <SingleBarView />
            </React.Suspense>
          </Route>
        </PolarisTestProvider>
      </Router>
    </MockedProvider>
  );
  const missingText = 'The page you’re looking for couldn’t be found';

  expect(await screen.findByText(missingText)).toBeInTheDocument();
});
