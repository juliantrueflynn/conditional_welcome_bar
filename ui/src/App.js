import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import Cookies from 'js-cookie';
import { ApolloProvider } from 'react-apollo';
import IndexBarsView from './views/IndexBarsView';
import SingleBarView from './views/SingleBarView';
import ShopifyProvider from './components/ShopifyProvider';
import MissingPageView from './views/MissingPageView';
import AuthManager from './components/AuthManager';

const App = () => {
  const client = new ApolloClient({
    uri: process.env.GRAPHQL_API_URL,
    credentials: 'include',
    request: (operation) => {
      const csrfToken = Cookies.get('cwb_csrf');

      if (csrfToken) {
        operation.setContext({ headers: { 'X-CSRF-Token': csrfToken } });
      }
    },
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ShopifyProvider>
          <AuthManager>
            <Switch>
              <Route exact path="/" component={IndexBarsView} />
              <Route path="/bars/:barId" component={SingleBarView} />
              <Route component={MissingPageView} />
            </Switch>
          </AuthManager>
        </ShopifyProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
