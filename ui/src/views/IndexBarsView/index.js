import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Page, Layout } from '@shopify/polaris';
import { shopOrigin } from '../../util/shopifyUtil';
import { GET_ALL_BARS } from '../../util/graphQlUtil';
import { apiCreate } from '../../util/apiUtil';
import BarsList from '../../components/BarsList';

const API_BAR_URL = `shops/${shopOrigin}/bars`;

const IndexBarsView = ({ history, location: { search } }) => {
  const [isActionLoading, setIsActionLoading] = useState(false);

  const navigateToBar = (barId) => history.push({ pathname: `/bars/${barId}`, search });

  const handleActionClick = () => {
    setIsActionLoading(true);

    apiCreate(API_BAR_URL)
      .then((payload) => navigateToBar(payload.id))
      .catch(() => setIsActionLoading(false));
  };

  const primaryAction = {
    content: 'Create welcome bar',
    onAction: handleActionClick,
    loading: isActionLoading,
  };

  return (
    <Query query={GET_ALL_BARS} variables={{ shopifyDomain: shopOrigin }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        if (error) {
          return <p>Error :(</p>;
        }

        return (
          <Page title="Home" primaryAction={primaryAction}>
            <Layout>
              <Layout.Section>
                <BarsList
                  bars={data.bars}
                  navigateToBar={navigateToBar}
                  createWelcomeBar={handleActionClick}
                  isActionLoading={isActionLoading}
                />
              </Layout.Section>
            </Layout>
          </Page>
        );
      }}
    </Query>
  );
};

IndexBarsView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default IndexBarsView;
