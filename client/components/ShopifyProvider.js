import React from 'react';
import PropTypes from 'prop-types';
import { AppProvider } from '@shopify/polaris';
import Cookies from 'js-cookie';

class ShopifyProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    shopOrigin: Cookies.get('shopOrigin'),
  };

  render() {
    const { children } = this.props;
    const { shopOrigin } = this.state;

    return (
      // eslint-disable-next-line no-undef
      <AppProvider shopOrigin={shopOrigin} apiKey={SHOPIFY_API_KEY} forceRedirect>
        {children}
      </AppProvider>
    );
  }
}

export default ShopifyProvider;
