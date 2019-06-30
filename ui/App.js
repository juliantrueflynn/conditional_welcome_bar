import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
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
    const LOGIN_URL = '/login';

    if (shopOrigin) {
      apiFetch(`shops/${shopOrigin}`).then((res) => {
        if (res.status === 302) {
          window.location.assign(`${LOGIN_URL}?shop=${shopOrigin}`);
          return;
        } else if (res.status === 404) {
          window.location.assign(LOGIN_URL);
        } else {
          setIsLoading(false);
        }
      });
    } else {
      window.location.assign(LOGIN_URL);
    }
  }, []);

  const client = new ApolloClient({
    uri: process.env.GRAPHQL_API_URL
  });

  if (isLoading) {
    return null;
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
