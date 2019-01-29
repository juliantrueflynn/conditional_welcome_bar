import React from 'react';
import PropTypes from 'prop-types';
import { ResourceList, EmptyState, Card } from '@shopify/polaris';
import BarsListItem from '../BarsListItem';

const BarsList = ({ bars }) => {
  const resourceName = {
    singular: 'Welcome Bar',
    plural: 'Welcome Bars',
  };

  if (!bars || !bars.length) {
    const emptyStateAction = {
      content: 'Create first bar',
      // eslint-disable-next-line no-console
      onAction: () => console.log('clicked'),
    };

    return (
      <EmptyState
        heading="Create bar to start"
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
        renderItem={(bar) => <BarsListItem {...bar} />}
      />
    </Card>
  );
};

BarsList.propTypes = {
  bars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

BarsList.defaultProps = {
  bars: [],
};

export default BarsList;
