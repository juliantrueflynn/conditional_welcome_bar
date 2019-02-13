import React from 'react';
import PropTypes from 'prop-types';
import { ResourceList, EmptyState, Card } from '@shopify/polaris';
import BarsListItem from '../BarsListItem';
import { apiFetch } from '../../../util/apiUtil';

class BarsList extends React.Component {
  state = { bars: [] };

  componentDidMount() {
    const { shopOrigin } = this.props;

    apiFetch(`shops/${shopOrigin}/bars`).then(bars => this.setState({ bars }));
  }

  render() {
    const { createWelcomeBar, isActionLoading, navigateToBar } = this.props;
    const { bars } = this.state;

    const resourceName = {
      singular: 'Welcome Bar',
      plural: 'Welcome Bars',
    };

    if (!bars || !bars.length) {
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
          renderItem={(bar) => (
            <BarsListItem {...bar} navigateToBar={navigateToBar} />
          )}
        />
      </Card>
    );
  }
}

BarsList.propTypes = {
  navigateToBar: PropTypes.func.isRequired,
  shopOrigin: PropTypes.string.isRequired,
};

export default BarsList;
