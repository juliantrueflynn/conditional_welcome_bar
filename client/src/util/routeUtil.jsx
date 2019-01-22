import React from 'react';
import { Route } from 'react-router-dom';
import Session from '../components/Session';

export const routesConfig = [
  {
    path: '/login',
    component: Session
  }
];

export function RouteWithSubRoutes(route) {
  return (    
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
};
