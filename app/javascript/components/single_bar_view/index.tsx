import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {BarQueryData, BarQueryVars} from './types';
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

  const query = useQuery<BarQueryData, BarQueryVars>(GET_SINGLE_BAR, {
    variables: {id: barId},
  });

  if (query.error) {
    return <NetworkErrorState />;
  }

  if (query.loading) {
    return <LoadingSkeleton />;
  }

  if (query.data?.bar) {
    return (
      <>
        <ModalDestroyBar
          onClose={() => setIsModalOpen(false)}
          isModalOpen={isModalOpen}
          barId={barId}
        />
        <SingleBar
          bar={query.data.bar}
          openModal={() => setIsModalOpen(true)}
          refetch={query.refetch}
        />
      </>
    );
  }

  return <NotFound />;
};

export default SingleBarView;
