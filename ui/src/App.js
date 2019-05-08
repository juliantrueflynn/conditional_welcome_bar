import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminHome from './components/AdminHome';
import SingleBarView from './components/SingleBarView';
import ShopifyProvider from './components/ShopifyProvider';

const App = () => (
  <BrowserRouter>
    <ShopifyProvider>
      <Switch>
        <Route exact path="/" component={AdminHome} />
        <Route path="/bars/:barId" component={SingleBarView} />
      </Switch>
    </ShopifyProvider>
  </BrowserRouter>
);

export default App;
