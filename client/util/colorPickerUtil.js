import { hsbToHex, rgbToHsb } from '@shopify/polaris';
import hexToRgb from 'hex-to-rgb';

export const convertFromHSBa = ({ backgroundHSBa, textHSBa }) => {
  const { alpha: backgroundOpacity, ...backgroundHSB } = backgroundHSBa;
  const { alpha: textOpacity, ...textHSB } = textHSBa;

  return {
    backgroundColor: hsbToHex(backgroundHSB),
    backgroundOpacity,
    textColor: hsbToHex(textHSB),
    textOpacity,
  };
};

const rgbMap = (rgb) => rgbToHsb({ red: rgb[0], green: rgb[1], blue: rgb[2] });

const hexToHSBa = (hex, alpha) => {
  const rgb = hexToRgb(hex);
  const hsb = rgbMap(rgb);

  return { ...hsb, alpha };
};

export const convertToHSBa = (bar) => {
  const backgroundHSBa = hexToHSBa(bar.backgroundColor, bar.backgroundOpacity);
  const textHSBa = hexToHSBa(bar.textColor, bar.textOpacity);

  return { backgroundHSBa, textHSBa };
};
