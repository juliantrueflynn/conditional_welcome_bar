import React from 'react';
import PropTypes from 'prop-types';
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
  location: PropTypes.instanceOf(Object).isRequired,
};

export default ShopifyAppRouter;
