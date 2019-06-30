import React from 'react';
import PropTypes from 'prop-types';
import { ColorPicker } from '@shopify/polaris';

const ColorPickerField = ({ label, id, color, updateColorPicker }) => {
  const handleColorPick = (hsba) => updateColorPicker(hsba, id);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <ColorPicker id={id} allowAlpha color={color} onChange={handleColorPick} />
    </>
  );
};

ColorPickerField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  updateColorPicker: PropTypes.func.isRequired,
  color: PropTypes.shape({
    alpha: PropTypes.number.isRequired,
    hue: PropTypes.number.isRequired,
    brightness: PropTypes.number.isRequired,
    saturation: PropTypes.number.isRequired,
  }).isRequired,
};

export default ColorPickerField;
