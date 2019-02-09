import React, { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import '@shopify/polaris/styles.css';
import { getShopOrigin, setShopOriginCookie } from '../util/apiUtil';
import ShopifyAppRouter from '../components/ShopifyAppRouter';
import ShopifyAppProvider from '../components/ShopifyAppProvider';
import LoadingManager from '../components/LoadingManager';

class MyApp extends App {
  render() {
    const { Component, pageProps, shopOrigin } = this.props;

    return (
      <Fragment>
        <Head>
          <title>Conditional Welcome Bar</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>
        <ShopifyAppProvider shopOrigin={shopOrigin}>
          {shopOrigin && <ShopifyAppRouter />}
          <LoadingManager>
            <Component {...pageProps} />
          </LoadingManager>
        </ShopifyAppProvider>
      </Fragment>
    );
  }
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const shopOrigin = getShopOrigin(ctx);
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  setShopOriginCookie(ctx);

  return { pageProps, shopOrigin };
};

export default MyApp;
