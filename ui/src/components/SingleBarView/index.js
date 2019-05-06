import React from 'react';
import PropTypes from 'prop-types';
import LoadingManager from '../LoadingManager';
import SingleBarForm from '../SingleBarForm';
import { useLoadViewData } from '../../hooks/useLoadViewData';

const SingleBarView = ({ match: { params }, history }) => {
  const { data: bar, isLoading } = useLoadViewData({
    apiPath: `bars/${params.barId}`,
    initialDataState: {},
  });

  const breadcrumbs = [{ content: 'Welcome Bars', onAction: () => history.push('/') }];

  if (!isLoading && !bar.id) {
    return null;
  }

  return (
    <LoadingManager loadingTo="single" isLoading={isLoading}>
      <SingleBarForm bar={bar} breadcrumbs={breadcrumbs} />
    </LoadingManager>
  );
};

SingleBarView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      barId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default SingleBarView;
