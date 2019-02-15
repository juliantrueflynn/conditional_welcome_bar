import React from 'react';
import PropTypes from 'prop-types';
import { ResourceList, EmptyState, Card } from '@shopify/polaris';
import BarsListItem from '../BarsListItem';

const BarsList = ({ bars, createWelcomeBar, isActionLoading, navigateToBar, isLoading }) => {
  const resourceName = {
    singular: 'Welcome Bar',
    plural: 'Welcome Bars',
  };

  if (!isLoading && (!bars || !bars.length)) {
    const emptyStateAction = {
      content: 'Create first bar',
      onAction: createWelcomeBar,
      loading: isActionLoading,
    };

    return (
      <EmptyState
        heading="Create welcome bar to start"
        action={emptyStateAction}
        image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
      >
        <p>Create your first welcome bar!</p>
      </EmptyState>
    );
  }

  return (
    <Card>
      <ResourceList
        resourceName={resourceName}
        items={bars}
        renderItem={(bar) => <BarsListItem {...bar} navigateToBar={navigateToBar} />}
      />
    </Card>
  );
};

BarsList.propTypes = {
  bars: PropTypes.instanceOf(Array).isRequired,
  isActionLoading: PropTypes.bool.isRequired,
  createWelcomeBar: PropTypes.func.isRequired,
  navigateToBar: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default BarsList;
