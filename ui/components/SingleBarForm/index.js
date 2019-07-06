import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { Page, Form } from '@shopify/polaris';
import { OverlaysContext } from '../../contexts/OverlaysContextProvider';
import SingleBarFormFields from '../SingleBarFormFields';

const SingleBarForm = ({
  bar,
  isUpdating,
  errors,
  updateBar,
  hasDirtyState,
  setHasDirtyState,
  dirtyInputs,
  updateDirtyInputs,
}) => {
  const [barAttributes, setBarAttributes] = useState(bar);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const { toggleModal } = useContext(OverlaysContext);

  const handleFormSubmit = () => updateBar(barAttributes);

  const handleValueChange = (value, id) => {
    setHasDirtyState(bar[id] !== value);
    setBarAttributes({ ...barAttributes, [id]: value });
    updateDirtyInputs(id);
  };

  const handleChoiceListValueChange = (value, id) => {
    let selected = value[0];
    let hasChanged = bar[id] !== value[0];

    if (Array.isArray(bar[id])) {
      selected = value;
      hasChanged = !isEqual(bar[id], value);
    }

    setHasDirtyState(hasChanged);
    setBarAttributes({ ...barAttributes, [id]: selected });
    updateDirtyInputs(id);
  };

  const handleImageUpload = (_, acceptedFiles) => {
    setBarAttributes({ ...barAttributes, backgroundImage: acceptedFiles[0] });
    setBackgroundFile(acceptedFiles[0]);
    setHasDirtyState(true);
  };

  const secondaryActions = [
    {
      content: 'Delete',
      destructive: true,
      onAction: () => toggleModal({ type: 'delete', title: 'Delete welcome bar?' }),
    },
    {
      content: 'Discard',
      disabled: !hasDirtyState,
      onAction: () =>
        toggleModal({
          type: 'discard',
          title: 'Discard unsaved changes?',
          onAction: () => {
            setBarAttributes(bar);
            setHasDirtyState(false);
          },
        }),
    },
  ];
  const primaryAction = {
    content: 'Save',
    onAction: handleFormSubmit,
    disabled: !hasDirtyState,
    loading: isUpdating,
  };

  return (
    <Page title={bar.title} primaryAction={primaryAction} secondaryActions={secondaryActions}>
      <Form onSubmit={handleFormSubmit}>
        <SingleBarFormFields
          updateFieldValue={handleValueChange}
          updateChoiceListValue={handleChoiceListValueChange}
          updateImageUpload={handleImageUpload}
          backgroundFile={backgroundFile}
          dirtyInputs={dirtyInputs}
          errors={errors}
          {...barAttributes}
        />
      </Form>
    </Page>
  );
};

SingleBarForm.propTypes = {
  bar: PropTypes.instanceOf(Object),
  isUpdating: PropTypes.bool.isRequired,
  updateBar: PropTypes.func.isRequired,
  hasDirtyState: PropTypes.bool.isRequired,
  setHasDirtyState: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Object),
};

SingleBarForm.defaultProps = {
  errors: {},
};

export default SingleBarForm;
