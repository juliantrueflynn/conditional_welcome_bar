import React, { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { Loading } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import { getShopOrigin, setShopOriginCookie } from '../util/apiUtil';
import ShopifyAppRouter from '../components/ShopifyAppRouter';
import ShopifyAppProvider from '../components/ShopifyAppProvider';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  componentDidMount() {
    Router.events.on('routeChangeStart', () => {
      this.setState({ isLoading: true });
    });

    Router.events.on('routeChangeComplete', () => {
      this.setState({ isLoading: false });
    });

    Router.events.on('routeChangeError', () => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { Component, pageProps, shopOrigin } = this.props;
    const { isLoading } = this.state;

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
          {isLoading && <Loading />}
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
