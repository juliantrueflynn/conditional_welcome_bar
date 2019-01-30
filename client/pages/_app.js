import React, { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import '@shopify/polaris/styles.css';
import ShopifyProvider from '../components/ShopifyProvider';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Fragment>
        <Head>
          <title>Sample App</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>
        <ShopifyProvider>
          <Component {...pageProps} />
        </ShopifyProvider>
      </Fragment>
    );
  }
}

export default MyApp;
