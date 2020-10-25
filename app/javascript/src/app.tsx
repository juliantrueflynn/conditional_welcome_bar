import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {ShopifyProvider, getShopifyAppConfig} from './shopify';
import React from 'react';

const SingleBarView = React.lazy(() => import('./components/single_bar_view'));
const IndexBarsView = React.lazy(() => import('./components/index_bars_view'));
const MissingPageView = React.lazy(() => import('./components/missing_page_view'));

const App = () => {
  const shopifyAppConfig = getShopifyAppConfig();

  if (!shopifyAppConfig) {
    return null;
  }

  return (
    <BrowserRouter>
      <ShopifyProvider config={shopifyAppConfig}>
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
  );
};

export default App;
