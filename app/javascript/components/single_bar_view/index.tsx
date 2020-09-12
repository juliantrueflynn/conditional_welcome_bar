import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {GET_SINGLE_BAR} from '../../utilities/graphql_tags';
import SingleBar from '../single_bar';
import NetworkErrorState from '../network_error_state';
import ModalDestroyBar from '../modal_destroy_bar';
import LoadingSkeleton from './loading_skeleton';
import NotFound from './not_found';

type RouterProps = {
  barId: string;
};

const SingleBarView = () => {
  const {barId} = useParams<RouterProps>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {loading, data, error} = useQuery(GET_SINGLE_BAR, {
    variables: {id: barId},
  });

  if (error) {
    return <NetworkErrorState />;
  }

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!loading && !data?.bar) {
    return <NotFound />;
  }

  return (
    <>
      <SingleBar bar={data.bar} openModal={() => setIsModalOpen(true)} />
      <ModalDestroyBar
        onClose={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
        barId={barId}
      />
    </>
  );
};

export default SingleBarView;
