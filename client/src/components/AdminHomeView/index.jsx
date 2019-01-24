import React, { Component } from 'react';
import { Layout, Page } from '@shopify/polaris';
import ShopifyProviderContainer from '../../containers/ShopifyProviderContainer';

class AdminHomeView extends Component {
  comonentDidMount() {
    // fetch bars index
  }

  componentDidUpdate() {
    // if bars index change length then re-fetch
  }

  render() {
    return (
      <ShopifyProviderContainer>
        <Page title="Home">
          <Layout>
            <div>Bars index going here</div>
          </Layout>
        </Page>
      </ShopifyProviderContainer>
    );
  }
}

export default AdminHomeView;
