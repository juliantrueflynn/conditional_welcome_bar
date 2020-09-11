import React from 'react';
import {ColorPicker, HSBAColor, rgbToHsb, hsbToRgb} from '@shopify/polaris';
import {FieldChangeEvent} from '../../types/fields';
import {Bar} from '../../types/bar';

const hsbToRgbString = (hsb: HSBAColor): string => {
  const rgbMap = hsbToRgb(hsb);

  return `rgba(${rgbMap.red},${rgbMap.green},${rgbMap.blue},${hsb.alpha})`;
};

const rgbStringToHsb = (rgb: string): HSBAColor => {
  const values = rgb.slice(5, -1).split(',').map(Number);
  const hsb = rgbToHsb({
    red: values[0],
    green: values[1],
    blue: values[2],
  });

  return {...hsb, alpha: values[3]};
};

type Props = {
  id: Bar;
  label: string;
  value: string;
  onChange: FieldChangeEvent;
};

const ColorPickerField = ({
  label,
  id,
  value,
  onChange: updateFieldValue,
}: Props) => {
  const hsbaColor = rgbStringToHsb(value);

  const handleColorPick = (colorPickerValue: HSBAColor) => {
    updateFieldValue(hsbToRgbString(colorPickerValue), id);
  };

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <ColorPicker
        id={id}
        allowAlpha
        color={hsbaColor}
        onChange={handleColorPick}
      />
    </>
  );
};

export default ColorPickerField;
