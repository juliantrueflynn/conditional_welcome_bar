import React from 'react';
import { AppProvider } from '@shopify/polaris';
import { Router, Switch, Route } from 'react-router-dom';
import history from './util/historyUtil';
import { shopOrigin } from './util/shopifyUtil';
import AlertsContextProvider from './contexts/AlertsContextProvider';
import ShopifyLinkRouter from './components/ShopifyLinkRouter';
import SingleBarDestroyModal from './components/SingleBarDestroyModal';
import ShopifyAppRouter from './components/ShopifyAppRouter';
import AdminHome from './components/AdminHome';
import SingleBarView from './components/SingleBarView';
import ShopifyToast from './components/ShopifyToast';

const App = () => {
  const { REACT_APP_SHOPIFY_API_CLIENT_KEY } = process.env;

  return (
    <Router history={history}>
      <AppProvider
        apiKey={REACT_APP_SHOPIFY_API_CLIENT_KEY}
        shopOrigin={shopOrigin}
        linkComponent={ShopifyLinkRouter}
        forceRedirect
      >
        <AlertsContextProvider>
          <ShopifyAppRouter />
          <SingleBarDestroyModal />
          <Switch>
            <Route exact path="/" component={AdminHome} />
            <Route path="/bars/:barId" component={SingleBarView} />
          </Switch>
          <ShopifyToast />
        </AlertsContextProvider>
      </AppProvider>
    </Router>
  );
};

export default App;
