import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import Cookies from 'js-cookie';
import { ApolloProvider } from 'react-apollo';
import IndexBarsView from './views/IndexBarsView';
import SingleBarView from './views/SingleBarView';
import ShopifyProvider from './components/ShopifyProvider';
import MissingPageView from './views/MissingPageView';
import { shopOrigin } from './util/shopifyUtil';
import { apiFetch } from './util/apiUtil';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const goToLogin = () => window.location.assign('/login');

    if (shopOrigin) {
      apiFetch(`shops/${shopOrigin}`).then((res) => {
        if (res.status === 302) {
          window.location.assign(`/login?shop=${shopOrigin}`);
          return;
        } else if (res.status === 'fail') {
          goToLogin();
        } else {
          setIsLoading(false);
        }
      });
    } else {
      goToLogin();
    }
  }, []);

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

  if (isLoading) {
    return 'LOADING AUTH COOKIE';
  }

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ShopifyProvider>
          <Switch>
            <Route exact path="/" component={IndexBarsView} />
            <Route path="/bars/:barId" component={SingleBarView} />
            <Route component={MissingPageView} />
          </Switch>
        </ShopifyProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
