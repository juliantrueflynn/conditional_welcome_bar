import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { shopOrigin, isOutsideShopifyAdmin } from '../../util/shopifyUtil';
import { GET_ALL_BARS, CREATE_BAR } from '../../util/graphQlUtil';
import BarsList from '../../components/BarsList';

const IndexBarsView = ({ history, location: { search } }) => {
  const navigateToBar = (barId) => history.push({ pathname: `/bars/${barId}`, search });

  const onCreateComplete = (response) => {
    if (response.createBar.bar) {
      navigateToBar(response.createBar.bar.id);
    }
  };

  const mutationInput = { input: { shopOrigin } };

  return (
    <Query
      query={GET_ALL_BARS}
      variables={{ shopifyDomain: shopOrigin }}
      skip={isOutsideShopifyAdmin}
    >
      {({ error, loading: isLoadingBars, data }) => {
        if (error) {
          return <p>Error :(</p>;
        }

        return (
          <Mutation
            mutation={CREATE_BAR}
            variables={mutationInput}
            onCompleted={onCreateComplete}
            ignoreResults
          >
            {(createBar, { loading: isCreating }) => (
              <BarsList
                bars={data && data.bars}
                navigateToBar={navigateToBar}
                createBar={createBar}
                isCreating={isCreating}
                isLoadingBars={isLoadingBars}
              />
            )}
          </Mutation>
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
