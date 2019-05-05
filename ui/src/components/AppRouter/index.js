import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import AdminHome from '../AdminHome';
import SingleBarView from '../SingleBarView';
import ShopifyAppRouter from '../ShopifyAppRouter';
import history from '../../util/historyUtil';

const AppRouter = () => (
  <Router history={history}>
    <ShopifyAppRouter />
    <Switch>
      <Route exact path="/" component={AdminHome} />
      <Route path="/bars/:barId" component={SingleBarView} />
    </Switch>
  </Router>
);

export default AppRouter;
