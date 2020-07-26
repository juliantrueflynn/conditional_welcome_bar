import React from 'react';
import { Page, Layout, EmptyState } from '@shopify/polaris';

type Props = {
  title: string;
  heading?: string;
  content: string;
  onAction?: () => void;
  image?: string;
};

const NetworkErrorBoundary: React.FC<Props> = ({
  title,
  heading,
  content,
  onAction,
  image,
  children,
}) => {
  const action = {
    content,
    onAction: onAction || null,
  };

  return (
    <Page title="No page found">
      <Layout>
        <EmptyState
          heading={}
          action={action}
          image={image}
        >
          {children}
        </EmptyState>
      </Layout>
    </Page>
  );
};

export default NetworkErrorBoundary;
