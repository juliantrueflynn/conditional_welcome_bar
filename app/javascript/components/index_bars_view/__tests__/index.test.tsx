import {enableFetchMocks} from 'jest-fetch-mock';
import React from 'react';
import IndexBarsView from '..';
import {screen, render} from '@testing-library/react';
import {MockedProvider} from '@apollo/client/testing';
import {PolarisTestProvider} from '@shopify/polaris';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {mockBarFields} from '../../../__mocks__/single_bar_mocks';
import {GET_ALL_BARS} from '../../../utilities/graphql_tags';

const mockBarsData = [
  {...mockBarFields, id: Math.random().toString(), title: 'Bar #1'},
  {...mockBarFields, id: Math.random().toString(), title: 'Bar #2'},
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
      data: {bars: mockBarsData},
    },
  };
  render(
    <MockedProvider mocks={[graphqlMock]} addTypename={false}>
      <Router history={history}>
        <PolarisTestProvider>
          <IndexBarsView />
        </PolarisTestProvider>
      </Router>
    </MockedProvider>
  );

  await screen.findByText(mockBarsData[0].title);

  mockBarsData.forEach((welcomeBar) => {
    expect(screen.getByText(welcomeBar.title)).toBeInTheDocument();
  });
});

it('renders error instead of entries', async () => {
  enableFetchMocks();
  const graphqlMock = {
    request: mockIndexGraphqlRequest,
    error: new Error('forced network error'),
  };
  render(
    <MockedProvider mocks={[graphqlMock]} addTypename={false}>
      <Router history={history}>
        <PolarisTestProvider>
          <IndexBarsView />
        </PolarisTestProvider>
      </Router>
    </MockedProvider>
  );

  expect(await screen.findByText('Reload this page')).toBeInTheDocument();
  expect(screen.queryByText(mockBarsData[0].title)).not.toBeInTheDocument();
});

it('renders empty list call to action if result empty', async () => {
  enableFetchMocks();
  const graphqlMock = {
    request: mockIndexGraphqlRequest,
    result: {
      data: {bars: []},
    },
  };
  render(
    <MockedProvider mocks={[graphqlMock]} addTypename={false}>
      <Router history={history}>
        <PolarisTestProvider>
          <IndexBarsView />
        </PolarisTestProvider>
      </Router>
    </MockedProvider>
  );

  expect(
    await screen.findByText('Create your first welcome bar!')
  ).toBeInTheDocument();
});
