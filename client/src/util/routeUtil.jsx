import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';
import Session from '../components/Session';

export const routesConfig = [
  {
    path: '/login',
    component: Session,
    isAuth: true,
  }
];

const mapStateToProps = state => ({
  isLoggedIn: !!state.session,
});

const RouteSubRoutes = (route) => {
  if (route.isAuth && route.isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (route.isProtected && !route.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
};

export const RouteWithSubRoutes = withRouter(connect(mapStateToProps, null)(RouteSubRoutes));
