import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { AppProvider } from '@shopify/polaris';
import LinkRouter from '../LinkRouter';

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
      linkComponent={(urlProps) => <LinkRouter {...urlProps} />}
      forceRedirect
    >
      <Fragment>{children}</Fragment>
    </AppProvider>
  );
};

ShopifyAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopifyAppProvider;
