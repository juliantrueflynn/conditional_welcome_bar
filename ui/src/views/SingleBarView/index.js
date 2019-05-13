import React from 'react';
import PropTypes from 'prop-types';
import { GET_SINGLE_BAR } from '../../util/graphQlUtil';
import { Query } from 'react-apollo';
import LoadingManager from '../../components/LoadingManager';
import SingleBar from '../../components/SingleBar';

const SingleBarView = ({ match: { params } }) => {
  return (
    <Query query={GET_SINGLE_BAR} variables={{ id: params.barId }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        if (error) {
          return <p>Error :(</p>;
        }

        return (
          <LoadingManager loadingTo="single" isLoading={loading}>
            <SingleBar bar={data.bar} />
          </LoadingManager>
        );
      }}
    </Query>
  );
};

SingleBarView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      barId: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default SingleBarView;
