import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../../utilities/graphql_utilities';
import ShopifyProvider from '../shopify_provider';

const SingleBarView = React.lazy(() => import('../single_bar_view'));
const IndexBarsView = React.lazy(() => import('../index_bars_view'));
const MissingPageView = React.lazy(() => import('../missing_page_view'));

const App: React.FC = () => {
  return (
    <ShopifyProvider>
      <ApolloProvider client={apolloClient}>
        <Switch>
          <Route exact path="/">
            <IndexBarsView />
          </Route>
          <Route path="/bars/:barId">
            <SingleBarView />
          </Route>
          <Route>
            <MissingPageView />
          </Route>
        </Switch>
      </ApolloProvider>
    </ShopifyProvider>
  );
};

export default App;
