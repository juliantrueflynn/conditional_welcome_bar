import React from 'react';
import PropTypes from 'prop-types';
import { GET_SINGLE_BAR } from '../../util/graphQlUtil';
import { Query } from 'react-apollo';
import SingleBar from '../../components/SingleBar';

const SingleBarView = ({ match: { params } }) => (
  <Query query={GET_SINGLE_BAR} variables={{ id: params.barId }}>
    {({ loading, error, data }) => {
      if (error) {
        return <p>Error :(</p>;
      }

      return <SingleBar bar={data && data.bar} loading={loading} />;
    }}
  </Query>
);

SingleBarView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      barId: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default SingleBarView;
