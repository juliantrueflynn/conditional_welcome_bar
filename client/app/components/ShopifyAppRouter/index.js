import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RoutePropagator from '@shopify/react-shopify-app-route-propagator';

const ShopifyAppRouter = (props, context) => {
  const { location } = props;
  const { polaris } = context;

  if (!polaris || !polaris.appBridge) {
    return null;
  }

  return <RoutePropagator location={location.pathname} app={polaris.appBridge} />;
};

ShopifyAppRouter.contextTypes = {
  polaris: PropTypes.instanceOf(Object),
};

ShopifyAppRouter.propTypes = {
  location: PropTypes.instanceOf(Object),
};

ShopifyAppRouter.defaultProps = {
  location: {},
};

export default withRouter(ShopifyAppRouter);
