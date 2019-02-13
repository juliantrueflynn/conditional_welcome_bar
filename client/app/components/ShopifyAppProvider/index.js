import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { AppProvider, Toast } from '@shopify/polaris';
import ShopifyLinkRouter from '../ShopifyLinkRouter';

const ShopifyAppProvider = ({
  shopOrigin,
  children,
  shouldShowToast,
  toastContent,
  toggleToast,
  history,
}) => {
  const { SHOPIFY_API_CLIENT_KEY } = process.env;

  if (!shopOrigin) {
    return (
      <AppProvider>
        <Fragment>{children}</Fragment>
      </AppProvider>
    );
  }

  return (
    <AppProvider
      apiKey={SHOPIFY_API_CLIENT_KEY}
      shopOrigin={shopOrigin}
      linkComponent={(urlProps) => (
        <ShopifyLinkRouter history={history} {...urlProps} />
      )}
      forceRedirect
    >
      <Fragment>
        {children}
        {shouldShowToast && (
          <Toast content={toastContent} onDismiss={toggleToast} />
        )}
      </Fragment>
    </AppProvider>
  );
};

ShopifyAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
  shopOrigin: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  shouldShowToast: PropTypes.bool.isRequired,
  toggleToast: PropTypes.func.isRequired,
  toastContent: PropTypes.string.isRequired,
};

ShopifyAppProvider.defaultProps = {
  shopOrigin: '',
};

export default ShopifyAppProvider;
