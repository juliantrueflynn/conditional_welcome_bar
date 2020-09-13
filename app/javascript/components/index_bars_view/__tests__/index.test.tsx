import {enableFetchMocks} from 'jest-fetch-mock';
import React from 'react';
import IndexBarsView from '..';
import {screen, render, waitFor} from '@testing-library/react';
import {MockedProvider} from '@apollo/client/testing';
import {PolarisTestProvider} from '@shopify/polaris';
import {Route, Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {CREATE_BAR, GET_ALL_BARS} from '../../../utilities/graphql_tags';
import userEvent from '@testing-library/user-event';

jest.mock('@shopify/polaris', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(jest.requireActual('@shopify/polaris') as any),
  // eslint-disable-next-line react/display-name
  Loading: () => <div data-testid="MockLoading" />,
}));

const createdAt = new Date().toString();
const mockBarsData = [
  {id: '1', title: 'Bar #1', content: 'Bar content #1', createdAt},
  {id: '2', title: 'Bar #2', content: 'Bar content #2', createdAt},
];
const mockQueryRequest = {query: GET_ALL_BARS};
const mockBarQueryNotEmpty = {
  request: mockQueryRequest,
  result: {data: {bars: mockBarsData}},
};
const mockBarQueryEmpty = {
  request: mockQueryRequest,
  result: {data: {bars: []}},
};
const mockBarQueryError = {
  request: mockQueryRequest,
  error: new Error('mock error'),
};

const mockHistory = () => createMemoryHistory({initialEntries: ['/']});

it('renders loading state before render entries', async (done) => {
  enableFetchMocks();
  render(
    <MockedProvider mocks={[mockBarQueryNotEmpty]} addTypename={false}>
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
  render(
    <MockedProvider mocks={[mockBarQueryError]} addTypename={false}>
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
  render(
    <MockedProvider mocks={[mockBarQueryEmpty]} addTypename={false}>
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

it('redirects to single bar after create', async () => {
  enableFetchMocks();
  const graphqlMocks = [
    mockBarQueryNotEmpty,
    {
      request: {query: CREATE_BAR},
      result: {
        data: {
          createBar: {
            bar: {id: '3'},
            __typename: 'createBar',
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={graphqlMocks} addTypename={false}>
      <Router history={mockHistory()}>
        <Route exact path="/">
          <PolarisTestProvider>
            <IndexBarsView />
          </PolarisTestProvider>
        </Route>
        <Route path="/bars/:barId">Mock Single Bar #3</Route>
      </Router>
    </MockedProvider>
  );

  await waitFor(() =>
    expect(screen.queryByText('Mock Single Bar #3')).not.toBeInTheDocument()
  );
  userEvent.click(screen.getByText('Create welcome bar'));
  expect(await screen.findByText('Mock Single Bar #3')).toBeInTheDocument();
});
