import React, { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import Cookies from 'js-cookie';

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
          <title>Sample App</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>
        {/* eslint-disable-next-line no-undef */}
        <AppProvider shopOrigin={shopOrigin} apiKey={SHOPIFY_API_KEY} forceRedirect>
          <Component {...pageProps} />
        </AppProvider>
      </Fragment>
    );
  }
}

export default MyApp;
