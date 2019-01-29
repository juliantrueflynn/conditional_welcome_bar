/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Page, EmptyState } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import fetch from 'isomorphic-fetch';
import ShopifyProvider from '../components/ShopifyProvider';

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

  render() {
    const { bars } = this.props;
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
      <ShopifyProvider>
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
      </ShopifyProvider>
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
