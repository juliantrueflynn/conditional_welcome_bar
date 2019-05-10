import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import IndexBarsView from './views/IndexBarsView';
import SingleBarView from './views/SingleBarView';
import ShopifyProvider from './components/ShopifyProvider';

const App = () => (
  <BrowserRouter>
    <ShopifyProvider>
      <Switch>
        <Route exact path="/" component={IndexBarsView} />
        <Route path="/bars/:barId" component={SingleBarView} />
      </Switch>
    </ShopifyProvider>
  </BrowserRouter>
);

export default App;
