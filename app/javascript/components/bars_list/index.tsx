import React from 'react';
import { ResourceList, EmptyState, Card, Layout, Page } from '@shopify/polaris';
import { useDelayedLoader } from '../../hooks/use_delayed_loader';
import BarsListItem from '../bars_list_item';
import { BarType, BarPayload } from '../../types/bar';
import { getLocale } from '../../utilities/get_locale';
import { ExecutionResult } from 'apollo-boost';
import { MutationFunctionOptions } from '@apollo/react-common';

type Props = {
  bars: BarType[];
  createBar: (
    options?: MutationFunctionOptions
  ) => Promise<ExecutionResult<BarPayload>>;
  isCreating: boolean;
  isLoadingBars: boolean;
};

const BarsList: React.FC<Props> = ({
  bars,
  createBar,
  isCreating,
  isLoadingBars,
}) => {
  const isLoading = useDelayedLoader(isLoadingBars);

  const primaryAction = {
    content: 'Create welcome bar',
    onAction: createBar,
    loading: isLoading || isCreating,
  };
  const resourceName = {
    singular: 'Welcome bar',
    plural: 'Welcome bars',
  };
  const locale = getLocale();
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
