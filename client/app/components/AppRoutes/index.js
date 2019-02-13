import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import ShopifyAppRouter from '../ShopifyAppRouter';
import Home from '../Home';
import Settings from '../Settings';

const AppRoutes = () => (
  <Fragment>
    <ShopifyAppRouter />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/settings" render={Settings} />
    </Switch>
  </Fragment>
);

export default AppRoutes;
