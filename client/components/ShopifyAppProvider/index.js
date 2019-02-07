import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { AppProvider } from '@shopify/polaris';

const ShopifyAppProvider = ({ children, shopOrigin }) => {
  if (!shopOrigin) {
    return (
      <AppProvider>
        <Fragment>{children}</Fragment>
      </AppProvider>
    );
  }

  return (
    <AppProvider
      // eslint-disable-next-line no-undef
      apiKey={SHOPIFY_API_CLIENT_KEY}
      shopOrigin={shopOrigin}
      forceRedirect
    >
      <Fragment>{children}</Fragment>
    </AppProvider>
  );
};

ShopifyAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
  shopOrigin: PropTypes.string,
};

ShopifyAppProvider.defaultProps = {
  shopOrigin: '',
};

export default ShopifyAppProvider;
