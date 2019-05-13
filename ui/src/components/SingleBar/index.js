import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { Page, Form } from '@shopify/polaris';
import { decamelizeKeys } from 'humps';
import SingleBarFormFields from '../../components/SingleBarFormFields';
import { apiUpdateBar } from '../../util/apiUtil';
import { OverlaysContext } from '../../contexts/OverlaysContextProvider';
import { convertFromHSBA, convertToHSBA } from '../../util/colorPickerUtil';

const INITIAL_HSBA_COLOR = { hue: 120, brightness: 1, saturation: 1, alpha: 1 };
const INITIAL_COLORS_STATE = { textHSBA: INITIAL_HSBA_COLOR, backgroundHSBA: INITIAL_HSBA_COLOR };

const SingleBar = ({ bar }) => {
  const [barAttributes, setBarAttributes] = useState({
    ...bar,
    ...convertToHSBA(bar),
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasDirtyState, setHasDirtyState] = useState(false);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [colors, setColors] = useState(INITIAL_COLORS_STATE);

  const { toggleModal, toggleToast } = useContext(OverlaysContext);

  const getFormData = () => {
    const nextState = decamelizeKeys({ ...barAttributes, ...convertFromHSBA(colors) });
    const formData = new FormData();

    Object.keys(nextState).forEach((key) => {
      formData.append(`bar[${key}]`, nextState[key]);
    });

    return formData;
  };

  const handleFormSubmit = () => {
    setIsUpdating(true);

    apiUpdateBar(barAttributes.id, getFormData()).then((json) => {
      setBarAttributes(json);
      setHasDirtyState(false);
      setIsUpdating(false);
      toggleToast('Welcome bar updated');
    });
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

  return (
    <Page
      title={barAttributes.title}
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
    >
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
  );
};

SingleBar.propTypes = {
  bar: PropTypes.instanceOf(Object),
};

export default SingleBar;
