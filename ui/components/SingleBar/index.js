import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import LoadingManager from '../../components/LoadingManager';
import SingleBarForm from '../../components/SingleBarForm';
import { UPDATE_BAR } from '../../util/graphQlUtil';
import { OverlaysContext } from '../../contexts/OverlaysContextProvider';
import { convertToHSBA, INITIAL_COLORS_STATE } from '../../util/colorPickerUtil';

const SingleBar = ({ bar, loading }) => {
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

  const { __typename, ...barData } = bar;
  const barAttributes = { ...barData, ...convertToHSBA(barData) };

  return (
    <LoadingManager loadingTo="single" isLoading={loading}>
      <Mutation mutation={UPDATE_BAR} onCompleted={onFormComplete}>
        {(updateBar, { loading: isUpdating, data: formData }) => {
          return (
            <SingleBarForm
              bar={barAttributes}
              updateBar={updateBar}
              isUpdating={isUpdating}
              formData={formData}
              hasDirtyState={hasDirtyState}
              setHasDirtyState={setHasDirtyState}
              dirtyInputs={dirtyInputs}
              updateDirtyInputs={updateDirtyInputs}
            />
          );
        }}
      </Mutation>
    </LoadingManager>
  );
};

SingleBar.propTypes = {
  bar: PropTypes.instanceOf(Object),
  loading: PropTypes.bool.isRequired,
};

SingleBar.defaultProps = {
  bar: { ...INITIAL_COLORS_STATE },
};

export default SingleBar;
