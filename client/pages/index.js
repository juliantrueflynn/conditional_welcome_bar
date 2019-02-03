/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Page } from '@shopify/polaris';
import { parseShopOrigin, apiFetch } from '../util/apiUtil';
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
  const shopOrigin = parseShopOrigin(ctx.query.shop);

  // eslint-disable-next-line no-console
  console.log('Index pathname', ctx.pathname);

  if (!shopOrigin) {
    return { bars: [] };
  }

  const response = await apiFetch(`shops/${shopOrigin}/bars`);

  return { bars: response };
};

export default Index;
