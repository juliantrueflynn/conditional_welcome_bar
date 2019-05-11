import React from 'react';
import PropTypes from 'prop-types';
import { Page, Layout, EmptyState } from '@shopify/polaris';

const MissingPageView = ({ history, location: { search } }) => {
  const goToHome = () => history.push({ pathname: '/', search });
  const action = { content: 'Return to home', onAction: goToHome };

  return (
    <Page title="No page found">
      <Layout>
        <EmptyState
          heading="Page missing!"
          action={action}
          image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
        >
          <p>The page you're looking for doesn't exist or couldn't be found.</p>
        </EmptyState>
      </Layout>
    </Page>
  );
};

MissingPageView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default MissingPageView;
