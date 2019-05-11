import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { Page, Form } from '@shopify/polaris';
import { decamelizeKeys } from 'humps';
import LoadingManager from '../../components/LoadingManager';
import SingleBarFormFields from '../../components/SingleBarFormFields';
import { apiUpdateBar, apiFetch } from '../../util/apiUtil';
import { OverlaysContext } from '../../contexts/OverlaysContextProvider';
import { convertFromHSBA, convertToHSBA } from '../../util/colorPickerUtil';

const INITIAL_HSBA_COLOR = { hue: 120, brightness: 1, saturation: 1, alpha: 1 };
const INITIAL_COLORS_STATE = { textHSBA: INITIAL_HSBA_COLOR, backgroundHSBA: INITIAL_HSBA_COLOR };
const INITIAL_BAR_STATE = { pageTemplates: [] };

const SingleBarView = ({ match: { params } }) => {
  const [bar, setBar] = useState(INITIAL_BAR_STATE);
  const [prevBarState, setPrevBarState] = useState(INITIAL_BAR_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasDirtyState, setHasDirtyState] = useState(false);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [colors, setColors] = useState(INITIAL_COLORS_STATE);

  const { toggleModal, toggleToast } = useContext(OverlaysContext);

  useEffect(() => {
    apiFetch(`bars/${params.barId}`).then((json) => {
      const { backgroundColor, backgroundOpacity, textColor, textOpacity } = json;
      const hsbaColorsParams = { backgroundColor, backgroundOpacity, textColor, textOpacity };
      const nextBarState = { ...INITIAL_BAR_STATE, ...json, ...convertToHSBA(hsbaColorsParams) };

      setIsLoading(false);
      setBar(nextBarState);
      setPrevBarState(nextBarState);
    });
  }, [params.barId]);

  const getFormData = () => {
    const nextState = decamelizeKeys({ ...bar, ...convertFromHSBA(colors) });
    const formData = new FormData();

    Object.keys(nextState).forEach((key) => {
      formData.append(`bar[${key}]`, nextState[key]);
    });

    return formData;
  };

  const handleFormSubmit = () => {
    setIsUpdating(true);

    apiUpdateBar(bar.id, getFormData()).then((json) => {
      setBar(json);
      setPrevBarState({ ...prevBarState, ...json });
      setHasDirtyState(false);
      setIsUpdating(false);
      toggleToast('Welcome bar updated');
    });
  };

  const handleValueChange = (value, id) => {
    if (Array.isArray(value)) {
      setHasDirtyState(!isEqual(prevBarState[id], value));
    } else {
      setHasDirtyState(bar[id] !== value);
    }

    setBar({ ...bar, [id]: value });
  };

  const handleColorPickerValueChange = (color, id) => {
    const nextColors = { ...colors, [id]: color };
    setColors(nextColors);
    setHasDirtyState(true);
  };

  const handleImageUpload = (_, acceptedFiles) => {
    setBar({ ...bar, backgroundImage: acceptedFiles[0] });
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
            setBar(prevBarState);
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

  if (!isLoading && !bar.id) {
    return null;
  }

  return (
    <LoadingManager loadingTo="single" isLoading={isLoading}>
      <Page title={bar.title} primaryAction={primaryAction} secondaryActions={secondaryActions}>
        <Form onSubmit={handleFormSubmit}>
          <SingleBarFormFields
            updateFieldValue={handleValueChange}
            updateColorPickerValue={handleColorPickerValueChange}
            updateImageUpload={handleImageUpload}
            backgroundFile={backgroundFile}
            {...colors}
            {...bar}
          />
        </Form>
      </Page>
    </LoadingManager>
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
