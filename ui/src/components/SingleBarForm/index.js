import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Page, Form, Button, ButtonGroup } from '@shopify/polaris';
import { decamelizeKeys } from 'humps';
import { convertToHSBa, convertFromHSBa } from '../../util/colorPickerUtil';
import { apiUpdateBar } from '../../util/apiUtil';
import SingleBarFormFields from '../SingleBarFormFields';
import ActiveBadge from '../ActiveBadge';
import { AlertsContext } from '../../contexts/AlertsContextProvider';

const INITIAL_HSBA_STATE = { hue: 120, brightness: 1, saturation: 1, alpha: 1 };
const INITIAL_COLORS_STATE = {
  textHSBa: INITIAL_HSBA_STATE,
  backgroundHSBa: INITIAL_HSBA_STATE
};

const SingleBarForm = ({ bar, breadcrumbs }) => {
  const [barAttributes, setBarAttributes] = useState({});
  const [pageTitle, setPageTitle] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasFormValuesChanged, setHasFormValuesChanged] = useState(false);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [colors, setColors] = useState(INITIAL_COLORS_STATE)

  useEffect(() => {
    const { backgroundColor, backgroundOpacity, textColor, textOpacity } = bar;
    const hsbaColorsParams = { backgroundColor, backgroundOpacity, textColor, textOpacity };

    setBarAttributes(bar);
    setColors(convertToHSBa(hsbaColorsParams));
  }, [bar]);

  const { toggleModal, toggleToast } = useContext(AlertsContext);

  const getFormData = () => {
    const nextState = decamelizeKeys({ ...barAttributes, ...convertFromHSBa(colors) });
    nextState.url = nextState.url || ''; // @TODO Remove after adding default value '' to schema

    const formData = new FormData();
    Object.keys(nextState).forEach((key) => {
      formData.append(`bar[${key}]`, nextState[key]);
    });

    return formData;
  }

  const handleFormSubmit = () => {
    setIsUpdating(true);

    apiUpdateBar(bar.id, getFormData()).then((json) => {
      setBarAttributes(json);
      setPageTitle(json.title);
      setHasFormValuesChanged(false);
      setIsUpdating(false);
      toggleToast('Welcome bar updated');
    });
  }

  const handleValueChange = (value, id) => {
    setBarAttributes({ ...barAttributes, [id]: value });
    setHasFormValuesChanged(bar[id] !== value);
  }

  const handleColorPickerValueChange = (color, id) => {
    const nextColors = { ...colors, [`${id}HSBa`]: color };
    setColors(nextColors);
    setBarAttributes({ ...barAttributes, ...convertFromHSBa(nextColors) });
    setHasFormValuesChanged(true);
  }

  const handleImageUpload = (_, acceptedFiles) => {
    setBarAttributes({ ...barAttributes, backgroundImage: acceptedFiles[0] });
    setBackgroundFile(acceptedFiles[0]);
    setHasFormValuesChanged(true);
  }

  const handleModalToggle = () => toggleModal(bar.id);

  const primaryAction = {
    content: 'Save',
    onAction: handleFormSubmit,
    disabled: !hasFormValuesChanged,
    loading: isUpdating,
  };
  const title = pageTitle || bar.title;

  return (
    <Page
      title={title}
      primaryAction={primaryAction}
      breadcrumbs={breadcrumbs}
      titleMetadata={<ActiveBadge isActive={barAttributes.isActive} />}
    >
      <Form onSubmit={handleFormSubmit}>
        <SingleBarFormFields
          updateFieldValue={handleValueChange}
          updateColorPickerValue={handleColorPickerValueChange}
          updateImageUpload={handleImageUpload}
          backgroundFile={backgroundFile}
          {...barAttributes}
          {...colors}
        />
        <div className="SingleBarForm__SecondaryButtons">
          <ButtonGroup>
            <Button onClick={handleModalToggle}>Delete</Button>
            <Button submit primary loading={isUpdating} disabled={!hasFormValuesChanged}>
              Save
            </Button>
          </ButtonGroup>
        </div>
      </Form>
    </Page>
  );
};

SingleBarForm.propTypes = {
  bar: PropTypes.instanceOf(Object).isRequired,
  breadcrumbs: PropTypes.instanceOf(Object).isRequired,
};

export default SingleBarForm;
