import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { GET_ALL_BARS, CREATE_BAR } from '../../utilities/graphql_tags';
import { BarPayload, BarType } from '../../types/bar';
import { useQuery, useMutation } from '@apollo/client';
import { Page, Layout } from '@shopify/polaris';
import BarsList from '../bars_list';
import EmptyState from '../empty_state';

const IndexBarsView: React.FC = () => {
  const history = useHistory();
  const { search } = useLocation();

  const { loading: isLoadingBars, data, error } = useQuery(GET_ALL_BARS);

  const [createBar, { loading: isCreating }] = useMutation(CREATE_BAR, {
    onCompleted: (response: BarPayload): void => {
      if (response.createBar.bar) {
        history.push({
          pathname: `/bars/${response.createBar.bar.id}`,
          search,
        });
      }
    },
    ignoreResults: true,
  });

  const bars: BarType[] | undefined = data && data.bars;
  const hasBars = bars && !!bars.length;
  const primaryAction = {
    content: 'Create welcome bar',
    onAction: createBar,
    loading: isLoadingBars || isCreating,
  };

  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <Page title="Home" primaryAction={primaryAction}>
      <Layout>
        <Layout.Section>
          {!isLoadingBars && !hasBars && (
            <EmptyState
              heading="Create welcome bar to start"
              action={primaryAction}
            >
              Create your first welcome bar!
            </EmptyState>
          )}
          {hasBars && <BarsList bars={bars || []} />}
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default IndexBarsView;
