import React from 'react';
import { ResourceList, EmptyState, Card, Layout, Page } from '@shopify/polaris';
import { BarType, BarPayload } from '../../types/bar';
import { ExecutionResult } from 'apollo-link';
import { MutationFunctionOptions } from '@apollo/react-common';

const BarsListItem = React.lazy(() => import('../bars_list_item'));

type Props = {
  bars: BarType[];
  createBar: (
    options?: MutationFunctionOptions
  ) => Promise<ExecutionResult<BarPayload>>;
  isCreating: boolean;
  isLoadingBars: boolean;
};

const locale: string =
  new URLSearchParams(window.location.search).get('locale') || 'en-US';

const BarsList: React.FC<Props> = ({
  bars,
  createBar,
  isCreating,
  isLoadingBars,
}) => {
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

  return (
    <Page title="Home" primaryAction={primaryAction}>
      <Layout>
        <Layout.Section>
          {!isLoadingBars && !hasBars && (
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
                renderItem={(bar: BarType): JSX.Element => (
                  <BarsListItem {...bar} locale={locale} />
                )}
              />
            </Card>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default BarsList;
