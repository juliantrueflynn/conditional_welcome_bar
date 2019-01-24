import React, { Component } from 'react';
import queryString from 'query-string';
import { AppProvider } from '@shopify/polaris';

class ShopifyProvider extends Component {
  getShopOrigin() {
    const { location: { search } } = this.props;
    const { shop } = queryString.parse(search);

    return shop;
  }

  render() {
    const { children } = this.props;
    const { REACT_APP_SHOPIFY_API_KEY } = process.env;
    const shopOrigin = this.getShopOrigin();

    return (
      <AppProvider
        apiKey={REACT_APP_SHOPIFY_API_KEY}
        shopOrigin={shopOrigin}
        forceRedirect
      >
        {children}
      </AppProvider>
    );
  }
}

export default ShopifyProvider;