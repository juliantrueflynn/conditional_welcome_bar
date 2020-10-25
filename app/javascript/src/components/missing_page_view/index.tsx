import React from 'react';
import {Page, Layout} from '@shopify/polaris';
import {useHistory, useLocation} from 'react-router-dom';
import EmptyState from '../empty_state';

const MissingPageView = () => {
  const history = useHistory();
  const {search} = useLocation();

  const action = {
    content: 'Return to home',
    onAction: () => history.push({pathname: '/', search}),
  };

  return (
    <Page title="No page found">
      <Layout>
        <EmptyState heading="Page missing!" action={action}>
          The page you&lsquo;re looking for doesn&lsquo;t exist or couldn&lsquo;t be found.
        </EmptyState>
      </Layout>
    </Page>
  );
};

export default MissingPageView;
