import { hsbToHex, rgbToHsb } from '@shopify/polaris';
import hexToRgb from 'hex-to-rgb';

export const convertFromHSBa = ({ backgroundHSBA, textHSBA }) => {
  const { alpha: backgroundOpacity, ...backgroundHSB } = backgroundHSBA;
  const { alpha: textOpacity, ...textHSB } = textHSBA;

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
  const backgroundHSBA = hexToHSBa(bar.backgroundColor, bar.backgroundOpacity);
  const textHSBA = hexToHSBa(bar.textColor, bar.textOpacity);

  return { backgroundHSBA, textHSBA };
};
