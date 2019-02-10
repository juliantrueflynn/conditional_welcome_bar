import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { AppProvider, Toast } from '@shopify/polaris';

const ShopifyAppProvider = ({
  children,
  toastContent,
  toggleToast,
  shouldShowToast,
  shopOrigin,
}) => {
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
      <Fragment>
        {children}
        {shouldShowToast && <Toast content={toastContent} onDismiss={toggleToast} />}
      </Fragment>
    </AppProvider>
  );
};

ShopifyAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
  shopOrigin: PropTypes.string,
  shouldShowToast: PropTypes.bool.isRequired,
  toggleToast: PropTypes.func.isRequired,
  toastContent: PropTypes.string.isRequired,
};

ShopifyAppProvider.defaultProps = {
  shopOrigin: '',
};

export default ShopifyAppProvider;
