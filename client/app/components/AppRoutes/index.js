import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import ShopifyAppRouter from '../ShopifyAppRouter';
import AdminHome from '../AdminHome';
import Settings from '../Settings';

const AppRoutes = () => (
  <Fragment>
    <ShopifyAppRouter />
    <Switch>
      <Route exact path="/" component={AdminHome} />
      <Route exact path="/settings" render={Settings} />
    </Switch>
  </Fragment>
);

export default AppRoutes;
