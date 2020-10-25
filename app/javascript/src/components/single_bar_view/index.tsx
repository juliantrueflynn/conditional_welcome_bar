import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {BarFields} from '../../types';
import {GET_SINGLE_BAR} from '../../utilities/graphql_tags';
import UpdateForm from './update_form';
import NetworkErrorState from '../network_error_state';
import ModalDestroyBar from '../modal_destroy_bar';
import LoadingSkeleton from './loading_skeleton';
import NotFound from './not_found';

type RouterProps = {
  barId: string;
};

type BarQueryData = {
  bar: BarFields;
};

type BarQueryVars = {
  id: string;
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
        <ModalDestroyBar onClose={() => setIsModalOpen(false)} isModalOpen={isModalOpen} barId={barId} />
        <UpdateForm barId={barId} bar={query.data.bar} openModal={() => setIsModalOpen(true)} />
      </>
    );
  }

  return <NotFound />;
};

export default SingleBarView;
