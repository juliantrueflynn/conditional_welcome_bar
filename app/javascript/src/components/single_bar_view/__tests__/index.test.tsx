import React from 'react';
import {screen, render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {PolarisTestProvider} from '@shopify/polaris';
import {mockBarFields} from '../../../test_utilities/single_bar_mocks';
import {MemoryRouter as Router, Route} from 'react-router';
import ToastContextProvider from '../../toast_context';
import SingleBarView from '..';
import {
  graphql,
  setupGraphqlServer,
} from '../../../test_utilities/mock_service_worker';
import ApolloProvider from '../../apollo_provider';

const graphqlServer = setupGraphqlServer();

jest.mock('@shopify/polaris', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(jest.requireActual('@shopify/polaris') as any),
  // eslint-disable-next-line react/display-name
  Loading: () => <div data-testid="MockLoading" />,
  // eslint-disable-next-line react/display-name
  Toast: (props: {content?: string}) => (
    <div data-testid="MockToast">{props.content}</div>
  ),
}));

const homepageText = 'Mocked Homepage';
const barId = '1';
const destroyModalMessage =
  'This will delete the current welcome bar and cannot be undone.';
const {__typename, ...mockBar} = mockBarFields;

const renderComponent = () => {
  Object.defineProperty(window, 'scroll', {
    value: jest.fn(),
  });

  return render(
    <ApolloProvider>
      <Router initialEntries={[`/bars/${barId}`]}>
        <PolarisTestProvider>
          <ToastContextProvider>
            <Route path="/bars/:barId">
              <SingleBarView />
            </Route>
            <Route exact path="/" render={() => <>{homepageText}</>} />
          </ToastContextProvider>
        </PolarisTestProvider>
      </Router>
    </ApolloProvider>
  );
};

test('renders loading state and before rendering single bar', async () => {
  renderComponent();

  expect(screen.getByTestId('MockLoading')).toBeInTheDocument();
  expect(screen.queryByText(mockBar.title)).not.toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByTestId('MockLoading')).not.toBeInTheDocument();
  });
  expect(screen.getByText(mockBar.title)).toBeInTheDocument();
});

test('triggers destroy modal on click', async () => {
  renderComponent();

  await waitFor(() =>
    expect(screen.queryByText(destroyModalMessage)).not.toBeInTheDocument()
  );
  userEvent.click(await screen.findByRole('button', {name: 'Delete'}));
  expect(screen.getByText(destroyModalMessage)).toBeInTheDocument();
  userEvent.click(screen.getAllByRole('button', {name: 'Delete'})[1]);
  expect(await screen.findByText(homepageText)).toBeInTheDocument();
});

test('toggles modal visibility', async () => {
  renderComponent();

  await waitFor(() =>
    expect(screen.queryByText(destroyModalMessage)).not.toBeInTheDocument()
  );
  userEvent.click(await screen.findByRole('button', {name: 'Delete'}));
  expect(screen.getByText(destroyModalMessage)).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', {name: 'Cancel'}));
  await waitFor(() =>
    expect(screen.queryByText(destroyModalMessage)).not.toBeInTheDocument()
  );
});

test('renders network error', async () => {
  graphqlServer.use(
    graphql.query('Bar', (_req, res) => res.networkError('Some network error'))
  );
  renderComponent();

  expect(screen.getByTestId('MockLoading')).toBeInTheDocument();
  expect(await screen.findByText('Reload this page')).toBeInTheDocument();
});

test('renders missing state if result blank', async () => {
  graphqlServer.use(
    graphql.query('Bar', (_req, res, ctx) => res(ctx.data({bar: null})))
  );
  renderComponent();

  expect(screen.getByTestId('MockLoading')).toBeInTheDocument();
  expect(
    await screen.findByText('The page you’re looking for couldn’t be found')
  ).toBeInTheDocument();
});

test('updates on submit and sets old state to new state', async () => {
  renderComponent();

  userEvent.type(await screen.findByPlaceholderText('Title'), 'some text');
  expect(screen.getByText('Save').closest('button')).toBeEnabled();
  userEvent.click(screen.getByText('Save'));
  expect(await screen.findByText('Welcome bar updated')).toBeInTheDocument();
  expect(screen.getByText('Save').closest('button')).toBeDisabled();
  expect(screen.getByPlaceholderText('Title')).toHaveValue(
    `${mockBarFields.title}some text`
  );
});
