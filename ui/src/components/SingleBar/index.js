import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { Page, Form } from '@shopify/polaris';
import { OverlaysContext } from '../../contexts/OverlaysContextProvider';
import { convertFromHSBA, INITIAL_COLORS_STATE } from '../../util/colorPickerUtil';
import SingleBarFormFields from '../../components/SingleBarFormFields';

const SingleBar = ({ bar, isUpdating, formData, updateBar, hasDirtyState, setHasDirtyState }) => {
  const [barAttributes, setBarAttributes] = useState(bar);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [colors, setColors] = useState(INITIAL_COLORS_STATE);
  const { toggleModal } = useContext(OverlaysContext);

  const handleFormSubmit = () => {
    const nextBar = { ...barAttributes, ...convertFromHSBA(barAttributes) };
    const { id, backgroundHSBA, textHSBA, ...attributes } = nextBar;

    updateBar({ variables: { input: { id, ...attributes } } });
  };

  const handleValueChange = (value, id) => {
    if (Array.isArray(value)) {
      setHasDirtyState(!isEqual(bar[id], value));
    } else {
      setHasDirtyState(bar[id] !== value);
    }

    setBarAttributes({ ...barAttributes, [id]: value });
  };

  const handleColorPickerValueChange = (color, id) => {
    const nextColors = { ...colors, [id]: color };
    setColors(nextColors);
    setHasDirtyState(true);
  };

  const handleImageUpload = (_, acceptedFiles) => {
    setBarAttributes({ ...barAttributes, backgroundImage: acceptedFiles[0] });
    setBackgroundFile(acceptedFiles[0]);
    setHasDirtyState(true);
  };

  const secondaryActions = [
    {
      content: 'Delete',
      onAction: () =>
        toggleModal({
          type: 'delete',
          title: 'Delete confirmation',
          message: 'Are you sure you want to delete this welcome bar?',
        }),
      destructive: true,
    },
    {
      content: 'Discard',
      onAction: () =>
        toggleModal({
          type: 'discard',
          title: 'Discard changes confirmation',
          message: 'Are you sure you want to discard all unsaved changes?',
          onAction: () => {
            setBarAttributes(bar);
            setHasDirtyState(false);
          },
        }),
      disabled: !hasDirtyState,
    },
  ];
  const primaryAction = {
    content: 'Save',
    onAction: handleFormSubmit,
    disabled: !hasDirtyState,
    loading: isUpdating,
  };

  const {
    updateBar: { errors },
  } = formData;

  return (
    <>
      {errors.map((error) => error)}
      <Page title={bar.title} primaryAction={primaryAction} secondaryActions={secondaryActions}>
        <Form onSubmit={handleFormSubmit}>
          <SingleBarFormFields
            updateFieldValue={handleValueChange}
            updateColorPickerValue={handleColorPickerValueChange}
            updateImageUpload={handleImageUpload}
            backgroundFile={backgroundFile}
            {...colors}
            {...barAttributes}
          />
        </Form>
      </Page>
    </>
  );
};

SingleBar.propTypes = {
  bar: PropTypes.instanceOf(Object),
  isUpdating: PropTypes.bool.isRequired,
  updateBar: PropTypes.func.isRequired,
  hasDirtyState: PropTypes.bool.isRequired,
  setHasDirtyState: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    updateBar: PropTypes.shape({
      errors: PropTypes.instanceOf(Array),
    }),
  }),
};

SingleBar.defaultProps = {
  formData: {
    updateBar: {
      errors: [],
    },
  },
};

export default SingleBar;
