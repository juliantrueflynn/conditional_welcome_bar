import React, {useMemo} from 'react';
import {
  ColorPicker as PolarisColorPicker,
  HSBAColor,
  rgbToHsb,
  hsbToRgb,
} from '@shopify/polaris';
import {Bar} from '../../types';

const hsbToRgbString = (hsb: HSBAColor) => {
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
  label?: string;
  value: string;
  onChange: (value: string, id: Bar) => void;
};

// Label element is not allowed due to htmlFor being pointed to div without aria labels allowed.
const ColorPickerField = ({
  label,
  id,
  value,
  onChange: updateFieldValue,
}: Props) => {
  const hsbaColor = useMemo(() => rgbStringToHsb(value), [value]);

  return (
    <>
      {!!label && (
        <div>
          <p>{label}</p>
        </div>
      )}
      <PolarisColorPicker
        id={id}
        allowAlpha
        color={hsbaColor}
        onChange={(colorPickerValue: HSBAColor) =>
          updateFieldValue(hsbToRgbString(colorPickerValue), id)
        }
      />
    </>
  );
};

export default ColorPickerField;
