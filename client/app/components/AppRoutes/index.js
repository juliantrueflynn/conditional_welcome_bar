import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import ShopifyAppRouter from '../ShopifyAppRouter';
import AdminHome from '../AdminHome';
import SingleBarView from '../SingleBarView';

const AppRoutes = () => (
  <Fragment>
    <ShopifyAppRouter />
    <Switch>
      <Route exact path="/" component={AdminHome} />
      <Route path="/bars/:barId" component={SingleBarView} />
    </Switch>
  </Fragment>
);

export default AppRoutes;
