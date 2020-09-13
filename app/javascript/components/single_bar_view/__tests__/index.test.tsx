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

jest.mock('@shopify/polaris', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(jest.requireActual('@shopify/polaris') as any),
  // eslint-disable-next-line react/display-name
  Loading: () => <div data-testid="MockLoading" />,
}));

const barId = '1';
const {__typename, ...mockBar} = mockBarFields;
const mockHistory = () =>
  createMemoryHistory({
    initialEntries: [`/bars/${barId}`],
  });

const request = {query: GET_SINGLE_BAR, variables: {id: barId}};
const mockBarSuccessQuery = {request, result: {data: {bar: mockBar}}};
const mockBarNullQuery = {request, result: {data: {bar: null}}};
const mockBarErrorQuery = {request, error: new Error('mock error')};

const setupWindowMocks = () => {
  enableFetchMocks();
  Object.defineProperty(window, 'scroll', {
    value: jest.fn(),
  });
};

it('renders loading state and before rendering single bar', async (done) => {
  setupWindowMocks();
  render(
    <MockedProvider mocks={[mockBarSuccessQuery]} addTypename={false}>
      <Router history={mockHistory()}>
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

  expect(screen.getByTestId('MockLoading')).toBeInTheDocument();
  expect(screen.queryByText(mockBar.title)).not.toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByTestId('MockLoading')).not.toBeInTheDocument();
  });
  expect(screen.getByText(mockBar.title)).toBeInTheDocument();
  done();
});

it('triggers destroy modal on click', async () => {
  setupWindowMocks();
  render(
    <MockedProvider mocks={[mockBarSuccessQuery]} addTypename={false}>
      <Router history={mockHistory()}>
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
  const errorMessage =
    'This will delete the current welcome bar and cannot be undone.';

  await waitFor(() =>
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
  );
  userEvent.click(screen.getByText('Delete'));
  expect(screen.getByText(errorMessage)).toBeInTheDocument();
});

it('renders network error', async () => {
  setupWindowMocks();
  render(
    <MockedProvider mocks={[mockBarErrorQuery]} addTypename={false}>
      <Router history={mockHistory()}>
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

  expect(await screen.findByText('Reload this page')).toBeInTheDocument();
});

it('renders missing state if result blank', async () => {
  setupWindowMocks();
  render(
    <MockedProvider mocks={[mockBarNullQuery]} addTypename={false}>
      <Router history={mockHistory()}>
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

  expect(
    await screen.findByText('The page you’re looking for couldn’t be found')
  ).toBeInTheDocument();
});
