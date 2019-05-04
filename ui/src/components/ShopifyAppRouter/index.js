import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RoutePropagator from '@shopify/react-shopify-app-route-propagator';

const ShopifyAppRouter = ({ location }, { polaris }) => {
  if (!polaris.appBridge) {
    return null;
  }

  return <RoutePropagator location={location.pathname} app={polaris.appBridge} />;
};

ShopifyAppRouter.contextTypes = {
  polaris: PropTypes.shape({
    appBridge: PropTypes.instanceOf(Object),
  }),
};

ShopifyAppRouter.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(ShopifyAppRouter);
