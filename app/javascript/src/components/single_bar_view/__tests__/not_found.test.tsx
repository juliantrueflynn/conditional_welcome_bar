import React from 'react';
import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {PolarisTestProvider} from '@shopify/polaris';
import {Router, Route} from 'react-router';
import {createMemoryHistory} from 'history';
import NotFound from '../not_found';

const mockRouterHistory = () =>
  createMemoryHistory({initialEntries: [`/bars/1`]});

it('goes to homepage on action click', async () => {
  render(
    <Router history={mockRouterHistory()}>
      <Route path="/bars/:barId">
        <PolarisTestProvider>
          <NotFound />
        </PolarisTestProvider>
      </Route>
      <Route exact path="/">
        MockHomepage
      </Route>
    </Router>
  );

  expect(screen.queryByText('MockHomepage')).not.toBeInTheDocument();
  userEvent.click(screen.getByText('View all welcome bars'));
  expect(screen.getByText('MockHomepage')).toBeInTheDocument();
});
