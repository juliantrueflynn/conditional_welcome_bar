import {enableFetchMocks} from 'jest-fetch-mock';
import React from 'react';
import IndexBarsView from '..';
import {screen, render, waitFor} from '@testing-library/react';
import {MockedProvider} from '@apollo/client/testing';
import {PolarisTestProvider} from '@shopify/polaris';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {mockBarFields} from '../../../__mocks__/single_bar_mocks';
import {GET_ALL_BARS} from '../../../utilities/graphql_tags';

jest.mock('@shopify/polaris', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(jest.requireActual('@shopify/polaris') as any),
  // eslint-disable-next-line react/display-name
  Loading: () => <div data-testid="MockLoading" />,
}));

const mockBarsData = [
  {...mockBarFields, id: Math.random().toString(), title: 'Bar #1'},
  {...mockBarFields, id: Math.random().toString(), title: 'Bar #2'},
];
const mockQueryRequest = {query: GET_ALL_BARS};

const mockHistory = () => createMemoryHistory({initialEntries: ['/']});

it('renders loading state before render entries', async (done) => {
  enableFetchMocks();
  const graphqlMock = {
    request: mockQueryRequest,
    result: {data: {bars: mockBarsData}},
  };
  render(
    <MockedProvider mocks={[graphqlMock]} addTypename={false}>
      <Router history={mockHistory()}>
        <PolarisTestProvider>
          <IndexBarsView />
        </PolarisTestProvider>
      </Router>
    </MockedProvider>
  );

  expect(screen.getByTestId('MockLoading')).toBeInTheDocument();
  expect(screen.queryByText(mockBarsData[0].title)).not.toBeInTheDocument();
  expect(screen.queryByText(mockBarsData[1].title)).not.toBeInTheDocument();
  await waitFor(() =>
    expect(screen.queryByTestId('MockLoading')).not.toBeInTheDocument()
  );
  expect(screen.getByText(mockBarsData[0].title)).toBeInTheDocument();
  expect(screen.getByText(mockBarsData[1].title)).toBeInTheDocument();
  done();
});

it('renders error instead of entries', async () => {
  enableFetchMocks();
  const graphqlMock = {
    request: mockQueryRequest,
    error: new Error('mock error'),
  };
  render(
    <MockedProvider mocks={[graphqlMock]} addTypename={false}>
      <Router history={mockHistory()}>
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
    request: mockQueryRequest,
    result: {data: {bars: []}},
  };
  render(
    <MockedProvider mocks={[graphqlMock]} addTypename={false}>
      <Router history={mockHistory()}>
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
