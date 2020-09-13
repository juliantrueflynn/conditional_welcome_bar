import {apolloClient} from './utilities/apollo_client';
import {ApolloProvider} from '@apollo/client';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import ShopifyProvider from './components/shopify_provider';
import React from 'react';

const SingleBarView = React.lazy(() => import('./components/single_bar_view'));
const IndexBarsView = React.lazy(() => import('./components/index_bars_view'));
const MissingPageView = React.lazy(
  () => import('./components/missing_page_view')
);

const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <ShopifyProvider>
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
      </ShopifyProvider>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
