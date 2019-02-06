import React, { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import '@shopify/polaris/styles.css';
import Cookies from 'js-cookie';
import ShopifyAppRouter from '../components/ShopifyAppRouter';
import ShopifyAppProvider from '../components/ShopifyAppProvider';

class MyApp extends App {
  state = {
    shopOrigin: Cookies.get('shopOrigin'),
  };

  render() {
    const { Component, pageProps } = this.props;
    const { shopOrigin } = this.state;

    return (
      <Fragment>
        <Head>
          <title>Conditional Welcome Bar</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>
        <ShopifyAppProvider shopOrigin={shopOrigin}>
          {shopOrigin && <ShopifyAppRouter />}
          <Component {...pageProps} />
        </ShopifyAppProvider>
      </Fragment>
    );
  }
}

export default MyApp;
