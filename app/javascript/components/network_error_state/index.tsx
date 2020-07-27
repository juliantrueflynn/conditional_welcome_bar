import React from 'react';
import EmptyState from '../empty_state';

const NetworkErrorState: React.FC = () => (
  <EmptyState
    heading="The page couldn&rsquo;t be displayed due to a network issue."
    action={{
      content: 'Reload this page',
      onAction: () => window.location.reload(),
    }}
  >
    We&rsquo;re either having server issues or there&rsquo;s a problem with your
    internet connection.
  </EmptyState>
);

export default NetworkErrorState;
