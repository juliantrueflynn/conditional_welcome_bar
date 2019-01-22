import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { routesConfig, RouteWithSubRoutes } from './util/routeUtil';
import history from './util/history';

const App = () => (
  <div className="App">
    <Router basename="/" history={history}>
      <Switch>
        {routesConfig.map(route => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
      </Switch>
    </Router>
  </div>
);

export default App;