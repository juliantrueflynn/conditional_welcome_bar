import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { AppProvider, Toast } from '@shopify/polaris';
import ShopifyLinkRouter from '../ShopifyLinkRouter';
import withShopCookie from '../../hocs/withShopCookie';

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
      // eslint-disable-next-line no-undef
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
  shouldShowToast: PropTypes.bool.isRequired,
  toggleToast: PropTypes.func.isRequired,
  toastContent: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(withShopCookie(ShopifyAppProvider));
