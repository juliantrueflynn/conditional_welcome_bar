import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Page, Layout } from '@shopify/polaris';
import { apiCreate } from '../../util/apiUtil';
import { shopOrigin } from '../../util/shopifyUtil';
import { useLoadViewData } from '../../hooks/useLoadViewData';
import LoadingManager from '../LoadingManager';
import BarsList from '../BarsList';

const API_BAR_URL = `shops/${shopOrigin}/bars`;

const AdminHome = ({ history, location: { search } }) => {
  const [isActionLoading, setIsActionLoading] = useState(false);

  const { data, isLoading } = useLoadViewData({ apiPath: API_BAR_URL, initialDataState: [] });

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
    <LoadingManager loadingTo="home" isLoading={isLoading}>
      <Page title="Home" primaryAction={primaryAction}>
        <Layout>
          <Layout.Section>
            <BarsList
              bars={data}
              navigateToBar={navigateToBar}
              createWelcomeBar={handleActionClick}
              isActionLoading={isActionLoading}
              isLoading={isLoading}
            />
          </Layout.Section>
        </Layout>
      </Page>
    </LoadingManager>
  );
};

AdminHome.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdminHome;
