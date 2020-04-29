import React from 'react';
import { Page, Layout, EmptyState } from '@shopify/polaris';
import { useHistory, useLocation } from 'react-router-dom';

const MissingPageView: React.FC = () => {
  const history = useHistory();
  const { search } = useLocation();

  const action = {
    content: 'Return to home',
    onAction: (): void => {
      history.push({ pathname: '/', search });
    },
  };

  return (
    <Page title="No page found">
      <Layout>
        <EmptyState
          heading="Page missing!"
          action={action}
          image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
        >
          <p>
            The page you&lsquo;re looking for doesn&lsquo;t exist or
            couldn&lsquo;t be found.
          </p>
        </EmptyState>
      </Layout>
    </Page>
  );
};

export default MissingPageView;
