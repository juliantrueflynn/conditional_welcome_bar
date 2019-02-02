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

export default SingleBar;
