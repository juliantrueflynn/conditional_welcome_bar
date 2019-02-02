/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Page } from '@shopify/polaris';
import '@shopify/polaris/styles.css';

class SingleBar extends React.Component {
  render() {
    const primaryAction = {
      content: 'Create new bar',
    };

    return (
      <Page title="Single" forceRender primaryAction={primaryAction}>
        <Layout>
          SINGLE VIEW
        </Layout>
      </Page>
    );
  }
}

SingleBar.getInitialProps = async (ctx) => {
  if (!ctx.query.id) {
    return { bar: {} };
  }

  // eslint-disable-next-line no-undef
  const res = await fetch(`${TUNNEL_URL}/api/bars/${ctx.query.id}`);
  const json = await res.json();

  return { bar: json };
};

export default SingleBar;
