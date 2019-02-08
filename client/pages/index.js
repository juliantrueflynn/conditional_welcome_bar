/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Page } from '@shopify/polaris';
import { getShopOrigin, apiFetch } from '../util/apiUtil';
import BarsList from '../components/BarsList';

class Index extends React.Component {
  static propTypes = {
    bars: PropTypes.instanceOf(Array),
  };

  static defaultProps = {
    bars: [],
  };

  render() {
    const { bars } = this.props;
    const primaryAction = {
      content: 'Create new bar',
    };

    return (
      <Page title="Home" forceRender primaryAction={primaryAction}>
        <Layout>
          <Layout.Section>
            <BarsList bars={bars} />
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

Index.getInitialProps = async (ctx) => {
  const shopOrigin = getShopOrigin(ctx);

  if (!shopOrigin) {
    return { bars: [] };
  }

  const response = await apiFetch(`shops/${shopOrigin}/bars`);

  return { bars: response };
};

export default Index;
