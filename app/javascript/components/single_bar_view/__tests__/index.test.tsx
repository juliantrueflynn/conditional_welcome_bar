import { enableFetchMocks } from 'jest-fetch-mock';
import React from 'react';
import SingleBarView from '..';
import { screen, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { PolarisTestProvider } from '@shopify/polaris';
import { createMemoryHistory } from 'history';
import { mockBarFields } from '../../../__mocks__/single_bar_mocks';
import { GET_SINGLE_BAR } from '../../../utilities/graphql_tags';
import { GraphQLError } from 'graphql';
import { Router, Route } from 'react-router';

const { __typename, createdAt, updatedAt, ...singleBarMock } = mockBarFields;
const graphqlSuccessResponseMock = {
  request: {
    query: GET_SINGLE_BAR,
    variables: { id: singleBarMock.id.toString() },
  },
  result: {
    data: { bar: { ...singleBarMock, id: singleBarMock.id.toString() } },
  },
};
const graphqlErrorResponseMocks = {
  request: {
    query: GET_SINGLE_BAR,
    variables: { id: singleBarMock.id.toString() },
  },
  result: {
    data: { bar: null },
    errors: [new GraphQLError('forced network error')],
  },
};
const stubbedHistoryEntries = createMemoryHistory({
  initialEntries: [`/bars/${singleBarMock.id}`],
});

it('renders single bar', async () => {
  enableFetchMocks();
  const { findByText } = render(
    <MockedProvider mocks={[graphqlSuccessResponseMock]} addTypename={false}>
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

  expect(await findByText(singleBarMock.title)).toBeInTheDocument();
});

it('renders error instead of entry', async () => {
  enableFetchMocks();
  const { findByText } = render(
    <MockedProvider mocks={[graphqlErrorResponseMocks]} addTypename={false}>
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

  expect(await findByText(errorText)).toBeInTheDocument();
  expect(screen.queryByText(singleBarMock.title)).not.toBeInTheDocument();
});
