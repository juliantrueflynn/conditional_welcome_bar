import React from 'react';
import {useHistory} from 'react-router-dom';
import {GET_ALL_BARS, CREATE_BAR} from '../../utilities/graphql_tags';
import {useQuery, useMutation} from '@apollo/client';
import {Page, Layout, PageProps} from '@shopify/polaris';
import {BarEntryProps} from './types';
import {PAGE_TITLE} from './constants';
import {getSingleBarUrlPath} from '../../utilities/get_single_bar_url_path';
import BarsList from './bars_list';
import EmptyState from '../empty_state';
import NetworkErrorState from '../network_error_state';
import LoadingSkeleton from './loading_skeleton';

type BarsQueryData = {
  bars: BarEntryProps[];
};

type CreateBarPayload = {
  bar?: {id: string};
};

const PageLayout = ({primaryAction, children}: PageProps) => (
  <Page title={PAGE_TITLE} primaryAction={primaryAction}>
    <Layout>
      <Layout.Section>{children}</Layout.Section>
    </Layout>
  </Page>
);

const IndexBarsView = () => {
  const history = useHistory();

  const barsQuery = useQuery<BarsQueryData>(GET_ALL_BARS);

  const [createBar, createBarQuery] = useMutation<{
    createBar: CreateBarPayload;
  }>(CREATE_BAR, {
    onCompleted: (result) => {
      if (result.createBar?.bar) {
        history.push({pathname: getSingleBarUrlPath(result.createBar.bar.id)});
      }
    },
  });

  const primaryAction = {
    content: 'Create welcome bar',
    onAction: createBar,
    loading: barsQuery.loading || createBarQuery.loading,
  };

  if (barsQuery.error) {
    return <NetworkErrorState />;
  }

  if (barsQuery.loading) {
    return <LoadingSkeleton />;
  }

  if (barsQuery.data?.bars && !!barsQuery.data.bars.length) {
    return (
      <PageLayout primaryAction={primaryAction}>
        <BarsList bars={barsQuery.data.bars} />
      </PageLayout>
    );
  }

  return (
    <PageLayout primaryAction={primaryAction}>
      <EmptyState heading="Create welcome bar to start" action={primaryAction}>
        Create your first welcome bar!
      </EmptyState>
    </PageLayout>
  );
};

export default IndexBarsView;
