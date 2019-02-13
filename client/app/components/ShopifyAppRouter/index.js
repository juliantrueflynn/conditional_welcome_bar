import React from 'react';
import * as PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import RoutePropagator from '@shopify/react-shopify-app-route-propagator';

const ShopifyAppRouter = (props, context) => {
  const { router } = props;
  const { polaris } = context;

  return <RoutePropagator location={router.asPath} app={polaris.appBridge} />;
};

ShopifyAppRouter.contextTypes = {
  polaris: PropTypes.instanceOf(Object),
};

ShopifyAppRouter.propTypes = {
  router: PropTypes.instanceOf(Object),
};

ShopifyAppRouter.defaultProps = {
  router: {},
};

export default withRouter(ShopifyAppRouter);
