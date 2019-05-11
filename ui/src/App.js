import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import IndexBarsView from './views/IndexBarsView';
import SingleBarView from './views/SingleBarView';
import ShopifyProvider from './components/ShopifyProvider';
import MissingPageView from './views/MissingPageView';

const App = () => (
  <BrowserRouter>
    <ShopifyProvider>
      <Switch>
        <Route exact path="/" component={IndexBarsView} />
        <Route path="/bars/:barId" component={SingleBarView} />
        <Route component={MissingPageView} />
      </Switch>
    </ShopifyProvider>
  </BrowserRouter>
);

export default App;
