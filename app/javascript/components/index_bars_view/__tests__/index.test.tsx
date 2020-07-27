import { enableFetchMocks } from 'jest-fetch-mock';
import React from 'react';
import IndexBarsView from '..';
import { screen, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { PolarisTestProvider } from '@shopify/polaris';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { mockBarFields } from '../../../__mocks__/single_bar_mocks';
import { GET_ALL_BARS } from '../../../utilities/graphql_tags';

const mockBarsData = [
  { ...mockBarFields, id: Math.random(), title: 'Bar #1' },
  { ...mockBarFields, id: Math.random(), title: 'Bar #2' },
];
const mockIndexGraphqlRequest = {
  query: GET_ALL_BARS,
};
const history = createMemoryHistory();

it('renders entries', async () => {
  enableFetchMocks();
  const graphqlMock = {
    request: mockIndexGraphqlRequest,
    result: {
      data: { bars: mockBarsData },
    },
  };
  const { getByText } = render(
    <MockedProvider mocks={[graphqlMock]} addTypename={false}>
      <Router history={history}>
        <PolarisTestProvider>
          <React.Suspense fallback="Mocked for test">
            <IndexBarsView />
          </React.Suspense>
        </PolarisTestProvider>
      </Router>
    </MockedProvider>
  );

  await waitFor(() => screen.getByText(mockBarsData[0].title));

  mockBarsData.forEach((welcomeBar) => {
    expect(getByText(welcomeBar.title)).toBeInTheDocument();
  });
});

it('renders error instead of entries', async () => {
  enableFetchMocks();
  const graphqlMock = {
    request: mockIndexGraphqlRequest,
    error: new Error('forced network error'),
  };
  const { findByText } = render(
    <MockedProvider mocks={[graphqlMock]} addTypename={false}>
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

it('renders empty list call to action if result empty', async () => {
  enableFetchMocks();
  const graphqlMock = {
    request: mockIndexGraphqlRequest,
    result: {
      data: { bars: [] },
    },
  };
  const { findByText } = render(
    <MockedProvider mocks={[graphqlMock]} addTypename={false}>
      <Router history={history}>
        <PolarisTestProvider>
          <React.Suspense fallback="Mocked for test">
            <IndexBarsView />
          </React.Suspense>
        </PolarisTestProvider>
      </Router>
    </MockedProvider>
  );
  const emptyListText = 'Create your first welcome bar!';

  expect(await findByText(emptyListText)).toBeInTheDocument();
});
