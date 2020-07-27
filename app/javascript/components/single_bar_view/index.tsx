import React from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_BAR } from '../../utilities/graphql_tags';
import SingleBar from '../single_bar';
import LoadingManager from '../loading_manager';
import EmptyState from '../empty_state';
import NetworkErrorState from '../network_error_state';

const SingleBarView: React.FC = () => {
  const history = useHistory();
  const { search } = useLocation();
  const { barId } = useParams();
  const { loading, data, error } = useQuery(GET_SINGLE_BAR, {
    variables: { id: barId },
  });
  const bar = data && data.bar;

  if (error) {
    return <NetworkErrorState />;
  }

  if (!loading && !bar) {
    return (
      <EmptyState
        heading="The page you&rsquo;re looking for couldn&rsquo;t be found"
        action={{
          content: 'View all welcome bars',
          onAction: () => history.push({ pathname: '/', search }),
        }}
      >
        Check the web address to make sure you entered the right welcome bar. Or
        navigate to the page from the View All welcome bars list.
      </EmptyState>
    );
  }

  return (
    <LoadingManager loadingTo="single" isLoading={loading}>
      <SingleBar bar={bar} />
    </LoadingManager>
  );
};

export default SingleBarView;
