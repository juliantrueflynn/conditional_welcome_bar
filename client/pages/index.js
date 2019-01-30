/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Page } from '@shopify/polaris';
import fetch from 'isomorphic-fetch';
import { parseShopOrigin } from '../util/apiUtil';
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
      <Page title="Home" primaryAction={primaryAction}>
        <Layout>
          <BarsList bars={bars} />
        </Layout>
      </Page>
    );
  }
}

Index.getInitialProps = async (ctx) => {
  const shopOrigin = parseShopOrigin(ctx.query.shop);

  console.log('Index pathname', ctx.pathname);

  if (!shopOrigin) {
    return { bars: [] };
  }

  // eslint-disable-next-line no-undef
  const res = await fetch(`${API_URL}/api/shops/${shopOrigin}/bars`);
  const json = await res.json();

  return { bars: json };
};

export default Index;
