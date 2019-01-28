/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { AppProvider, Layout, Page, EmptyState } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import Cookies from 'js-cookie';
import fetch from 'isomorphic-fetch';

class Index extends React.Component {
  static propTypes = {
    bars: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
    ),
  };

  static defaultProps = {
    bars: [],
  };

  state = {
    shopOrigin: Cookies.get('shopOrigin'),
  };

  render() {
    const { bars } = this.props;
    const { shopOrigin } = this.state;
    const primaryAction = {
      content: 'Create new bar',
    };
    const emptyStateAction = {
      content: 'Create first bar',
      // eslint-disable-next-line no-console
      onAction: () => console.log('clicked'),
    };

    // eslint-disable-next-line no-console
    console.log(bars);

    return (
      <React.Fragment>
        <Head>
          <title>Dashboard</title>
          <meta name="description" content="description for indexing bots" />
        </Head>
        {/* eslint-disable-next-line no-undef */}
        <AppProvider shopOrigin={shopOrigin} apiKey={SHOPIFY_API_KEY} forceRedirect>
          <Page title="Home" primaryAction={primaryAction}>
            <Layout>
              <p>Polaris sample working!</p>
              {(!bars || !bars.length) && (
                <EmptyState
                  heading="Create bar to start"
                  action={emptyStateAction}
                  image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
                >
                  <p>Create your first welcome bar!</p>
                </EmptyState>
              )}
            </Layout>
          </Page>
        </AppProvider>
      </React.Fragment>
    );
  }
}

Index.getInitialProps = async () => {
  // eslint-disable-next-line no-undef
  const res = await fetch(`${API_URL}/api/shops/jiffywelcomebar/bars`);
  const json = await res.json();

  return { bars: json };
};

export default Index;
