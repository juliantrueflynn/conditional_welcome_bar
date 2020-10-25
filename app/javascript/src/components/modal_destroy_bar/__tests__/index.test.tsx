import React from 'react';
import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {PolarisTestProvider} from '@shopify/polaris';
import {MemoryRouter as Router, Route} from 'react-router';
import ApolloProvider from '../../apollo_provider';
import {
  graphql,
  setupGraphqlServer,
} from '../../../test_utilities/mock_service_worker';
import ToastContextProvider from '../../toast_context';
import ModalDestroyBar from '..';

const graphqlServer = setupGraphqlServer();

const homepageText = 'Mocked Homepage';
const barId = '1';
const onClose = jest.fn();

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
              <ModalDestroyBar isModalOpen barId={barId} onClose={onClose} />
            </Route>
            <Route exact path="/" render={() => <>{homepageText}</>} />
          </ToastContextProvider>
        </PolarisTestProvider>
      </Router>
    </ApolloProvider>
  );
};

test('goes to homepage on delete click', async () => {
  renderComponent();

  expect(screen.queryByText(homepageText)).not.toBeInTheDocument();
  userEvent.click(screen.getByRole('button', {name: 'Delete'}));
  expect(await screen.findByText(homepageText)).toBeInTheDocument();
});

test('does not delete if error present', async () => {
  graphqlServer.use(
    graphql.mutation('DestroyBar', (_req, res, ctx) =>
      res(
        ctx.errors([
          {
            message: 'Welcome bar does not exist',
            locations: [{line: 2, column: 3}],
            path: ['destroyBar'],
            extensions: {code: 'RECORD_NOT_FOUND'},
          },
        ])
      )
    )
  );
  renderComponent();

  expect(screen.queryByText(homepageText)).not.toBeInTheDocument();
  userEvent.click(screen.getByRole('button', {name: 'Delete'}));
  expect(await screen.findByText(homepageText)).toBeInTheDocument();
});

test('closes modal on cancel click', async () => {
  renderComponent();

  userEvent.click(screen.getByRole('button', {name: 'Cancel'}));
  expect(onClose).toHaveBeenCalledTimes(1);
});
