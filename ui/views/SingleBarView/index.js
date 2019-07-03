import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { GET_SINGLE_BAR, UPDATE_BAR } from '../../util/graphQlUtil';
import { Query, Mutation } from 'react-apollo';
import LoadingManager from '../../components/LoadingManager';
import SingleBar from '../../components/SingleBar';
import { convertToHSBA, INITIAL_COLORS_STATE } from '../../util/colorPickerUtil';
import { OverlaysContext } from '../../contexts/OverlaysContextProvider';

const SingleBarView = ({ match: { params } }) => {
  const [hasDirtyState, setHasDirtyState] = useState(false);
  const [dirtyInputs, setDirtyInputs] = useState({});
  const { toggleToast } = useContext(OverlaysContext);

  const onFormComplete = (success) => {
    setHasDirtyState(false);
    setDirtyInputs({});

    if (success && success.updateBar.bar) {
      toggleToast('Welcome bar updated');
    }
  };

  const updateDirtyInputs = (id) => setDirtyInputs({ ...dirtyInputs, [id]: true });

  return (
    <Query query={GET_SINGLE_BAR} variables={{ id: params.barId }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        if (error) {
          return <p>Error :(</p>;
        }

        const { __typename, ...bar } = data.bar;
        const barAttributes = { ...bar, ...convertToHSBA(bar), ...INITIAL_COLORS_STATE };

        return (
          <LoadingManager loadingTo="single" isLoading={loading}>
            <Mutation mutation={UPDATE_BAR} onCompleted={onFormComplete}>
              {(updateBar, { loading: isUpdating, data: formData }) => (
                <SingleBar
                  bar={barAttributes}
                  updateBar={updateBar}
                  isUpdating={isUpdating}
                  formData={formData}
                  hasDirtyState={hasDirtyState}
                  setHasDirtyState={setHasDirtyState}
                  dirtyInputs={dirtyInputs}
                  updateDirtyInputs={updateDirtyInputs}
                />
              )}
            </Mutation>
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
