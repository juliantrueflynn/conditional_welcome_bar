import React from 'react';
import PropTypes from 'prop-types';
import RoutePropagator from '@shopify/react-shopify-app-route-propagator';

const ShopifyAppRouter = (context) => {
  const { polaris } = context;

  if (!polaris || !polaris.appBridge) {
    return null;
  }

  return <RoutePropagator location={window.location.pathname} app={polaris.appBridge} />;
};

ShopifyAppRouter.contextTypes = {
  polaris: PropTypes.instanceOf(Object),
};

export default ShopifyAppRouter;
