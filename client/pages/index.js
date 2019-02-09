import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Page } from '@shopify/polaris';
import { getShopOrigin, apiFetch } from '../util/apiUtil';
import BarsList from '../components/BarsList';

const Index = ({ bars }) => {
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
};

Index.propTypes = {
  bars: PropTypes.instanceOf(Array),
};

Index.defaultProps = {
  bars: [],
};

Index.getInitialProps = async (ctx) => {
  const shopOrigin = getShopOrigin(ctx);

  if (!shopOrigin) {
    return { bars: [] };
  }

  const response = await apiFetch(`shops/${shopOrigin}/bars`);

  return { bars: response };
};

export default Index;
