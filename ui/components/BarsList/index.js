import React from 'react';
import PropTypes from 'prop-types';
import { ResourceList, EmptyState, Card, Layout, Page } from '@shopify/polaris';
import BarsListItem from '../BarsListItem';

const BarsList = ({ bars, createBar, isCreating, isLoadingBars, navigateToBar }) => {
  const primaryAction = {
    content: 'Create welcome bar',
    onAction: createBar,
    loading: isLoadingBars || isCreating,
  };

  const resourceName = {
    singular: 'Welcome bar',
    plural: 'Welcome bars',
  };

  const hasBars = !!bars.length;
  const hasEmptyState = !isLoadingBars && !hasBars;

  return (
    <Page title="Home" primaryAction={primaryAction}>
      <Layout>
        <Layout.Section>
          {hasEmptyState && (
            <EmptyState
              heading="Create welcome bar to start"
              action={primaryAction}
              image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
            >
              <p>Create your first welcome bar!</p>
            </EmptyState>
          )}
          {hasBars && (
            <Card>
              <ResourceList
                resourceName={resourceName}
                items={bars}
                renderItem={(bar) => <BarsListItem {...bar} navigateToBar={navigateToBar} />}
              />
            </Card>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
};

BarsList.propTypes = {
  bars: PropTypes.instanceOf(Array),
  createBar: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
  isLoadingBars: PropTypes.bool.isRequired,
  navigateToBar: PropTypes.func.isRequired,
};

BarsList.defaultProps = {
  bars: [],
};

export default BarsList;
