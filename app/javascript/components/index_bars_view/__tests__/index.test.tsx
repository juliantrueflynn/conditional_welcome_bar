import { enableFetchMocks } from 'jest-fetch-mock';
import React from 'react';
import IndexBarsView from '..';
import { screen, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { PolarisTestProvider } from '@shopify/polaris';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { mockBarFields } from '../../../__mocks__/single_bar_mocks';
import { GET_ALL_BARS } from '../../../utilities/graphql_tags';
import { GraphQLError } from 'graphql';

const mockBarsData = [
  { ...mockBarFields, id: Math.random(), title: 'Bar #1' },
  { ...mockBarFields, id: Math.random(), title: 'Bar #2' },
];
const graphqlSuccessResponseMocks = [
  {
    request: {
      query: GET_ALL_BARS,
    },
    result: {
      data: { bars: mockBarsData },
    },
  },
];
const graphqlErrorResponseMocks = [
  {
    request: {
      query: GET_ALL_BARS,
    },
    result: {
      data: { bars: [] },
      errors: [new GraphQLError('forced network error')],
    },
  },
];

it('renders entries', () => {
  enableFetchMocks();
  const history = createMemoryHistory();
  const { findByText } = render(
    <MockedProvider mocks={graphqlSuccessResponseMocks} addTypename={false}>
      <Router history={history}>
        <PolarisTestProvider>
          <React.Suspense fallback="Mocked for test">
            <IndexBarsView />
          </React.Suspense>
        </PolarisTestProvider>
      </Router>
    </MockedProvider>
  );

  mockBarsData.forEach(async (welcomeBar) => {
    expect(await findByText(welcomeBar.title)).toBeInTheDocument();
  });
});

it('renders error instead of entries', async () => {
  enableFetchMocks();
  const history = createMemoryHistory();
  const { findByText } = render(
    <MockedProvider mocks={graphqlErrorResponseMocks} addTypename={false}>
      <Router history={history}>
        <PolarisTestProvider>
          <React.Suspense fallback="Mocked for test">
            <IndexBarsView />
          </React.Suspense>
        </PolarisTestProvider>
      </Router>
    </MockedProvider>
  );
  const errorText = 'Reload this page';

  expect(await findByText(errorText)).toBeInTheDocument();
  expect(screen.queryByText(mockBarsData[0].title)).not.toBeInTheDocument();
});
