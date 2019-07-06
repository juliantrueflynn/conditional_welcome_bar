import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import LoadingManager from '../../components/LoadingManager';
import SingleBarForm from '../../components/SingleBarForm';
import { UPDATE_BAR } from '../../util/graphQlUtil';
import { OverlaysContext } from '../../contexts/OverlaysContextProvider';
import { useDelayedLoader } from '../../util/customHooksUtil';
import { rgbStringToHsb, hsbToRgbString } from '../../util/colorPickerUtil';

const SingleBar = ({ bar, loading }) => {
  const [hasDirtyState, setHasDirtyState] = useState(false);
  const [dirtyInputs, setDirtyInputs] = useState({});
  const isLoading = useDelayedLoader(loading);
  const { toggleToast } = useContext(OverlaysContext);

  const onFormComplete = (formData) => {
    setHasDirtyState(false);
    setDirtyInputs({});

    if (formData && formData.updateBar.bar) {
      toggleToast('Welcome bar updated');
    }
  };

  const updateDirtyInputs = (id) => setDirtyInputs({ ...dirtyInputs, [id]: true });

  const { __typename, id, ...barData } = bar;
  barData.textColor = rgbStringToHsb(bar.textColor);
  barData.backgroundColor = rgbStringToHsb(bar.backgroundColor);

  return (
    <LoadingManager loadingTo="single" isLoading={isLoading}>
      <Mutation mutation={UPDATE_BAR} onCompleted={onFormComplete}>
        {(updateBar, { loading: isUpdating, data: formData }) => {
          const errors = formData && formData.updateBar && formData.updateBar.errors;

          const handleUpdate = (values) => {
            values.textColor = hsbToRgbString(values.textColor);
            values.backgroundColor = hsbToRgbString(values.backgroundColor);

            updateBar({ variables: { input: { id, ...values } } });
          };

          return (
            <SingleBarForm
              bar={barData}
              updateBar={handleUpdate}
              isUpdating={isUpdating}
              errors={errors}
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
  bar: {},
};

export default SingleBar;
