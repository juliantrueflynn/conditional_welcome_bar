import React from 'react';
import IndexBarsView from '..';
import {screen, render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {PolarisTestProvider} from '@shopify/polaris';
import {MemoryRouter as Router, Route} from 'react-router-dom';
import ApolloProvider from '../../apollo_provider';
import {graphql, setupGraphqlServer} from '../../../test_utilities/mock_service_worker';

const graphqlServer = setupGraphqlServer();

jest.mock('@shopify/polaris', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(jest.requireActual('@shopify/polaris') as any),
  // eslint-disable-next-line react/display-name
  Loading: () => <div data-testid="MockLoading" />,
}));

const mockBarsData = [
  {
    id: '1',
    title: 'Bar #1',
    content: 'Bar content #1',
    createdAt: new Date().toString(),
  },
  {
    id: '2',
    title: 'Bar #2',
    content: 'Bar content #2',
    createdAt: new Date().toString(),
  },
];

const renderComponent = () =>
  render(
    <ApolloProvider>
      <Router initialEntries={['/']}>
        <PolarisTestProvider>
          <>
            <Route exact path="/">
              <IndexBarsView />
            </Route>
            <Route path="/bars/:barId">Mock Single Bar #3</Route>
          </>
        </PolarisTestProvider>
      </Router>
    </ApolloProvider>
  );

test('renders loading state before render entries', async (done) => {
  graphqlServer.use(graphql.query('Bars', (_req, res, ctx) => res(ctx.data({bars: mockBarsData}))));
  renderComponent();

  expect(screen.getByTestId('MockLoading')).toBeInTheDocument();
  expect(screen.queryByText(mockBarsData[0].title)).not.toBeInTheDocument();
  expect(screen.queryByText(mockBarsData[1].title)).not.toBeInTheDocument();
  await waitFor(() => expect(screen.queryByTestId('MockLoading')).not.toBeInTheDocument());
  expect(screen.getByText(mockBarsData[0].title)).toBeInTheDocument();
  expect(screen.getByText(mockBarsData[1].title)).toBeInTheDocument();
  done();
});

test('renders error instead of entries', async () => {
  graphqlServer.use(graphql.query('Bars', (_req, res) => res.networkError('Some network error')));
  renderComponent();

  expect(await screen.findByText('Reload this page')).toBeInTheDocument();
  expect(screen.queryByText(mockBarsData[0].title)).not.toBeInTheDocument();
});

test('renders empty list call to action if result empty', async () => {
  graphqlServer.use(graphql.query('Bars', (_req, res, ctx) => res(ctx.data({bars: []}))));
  renderComponent();

  expect(await screen.findByText('Create your first welcome bar!')).toBeInTheDocument();
});

test('redirects to single bar after create', async () => {
  graphqlServer.use(graphql.query('Bars', (_req, res, ctx) => res(ctx.data({bars: []}))));
  renderComponent();

  expect(screen.getByTestId('MockLoading')).toBeInTheDocument();
  const buttons = await screen.findAllByText('Create welcome bar');
  userEvent.click(buttons[0]);
  expect(await screen.findByText('Mock Single Bar #3')).toBeInTheDocument();
});
