import React, { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import '@shopify/polaris/styles.css';
import { AppProvider } from '@shopify/polaris';
import Cookies from 'js-cookie';
import ShopifyAppRouter from '../components/ShopifyAppRouter';
import LinkRouter from '../components/LinkRouter';

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
        <AppProvider
          // eslint-disable-next-line no-undef
          apiKey={SHOPIFY_API_CLIENT_KEY}
          shopOrigin={shopOrigin}
          linkComponent={(urlProps) => <LinkRouter {...urlProps} />}
          forceRedirect
        >
          <React.Fragment>
            <ShopifyAppRouter />
            <Component {...pageProps} />
          </React.Fragment>
        </AppProvider>
      </Fragment>
    );
  }
}

export default MyApp;
