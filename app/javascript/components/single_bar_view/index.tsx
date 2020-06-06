import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_SINGLE_BAR } from '../../utilities/graphql_utilities';
import SingleBar from '../single_bar';
import LoadingManager from '../loading_manager';

const SingleBarView: React.FC = () => {
  const { barId } = useParams();
  const { loading, data, error } = useQuery(GET_SINGLE_BAR, {
    variables: { id: barId },
  });
  const isBarUndefined = !data || !data.bar;

  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <LoadingManager loadingTo="single" isLoading={loading || isBarUndefined}>
      <SingleBar bar={data && data.bar} />;
    </LoadingManager>
  );
};

export default SingleBarView;