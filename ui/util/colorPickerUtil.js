import { hsbToHex, rgbToHsb } from '@shopify/polaris';
import hexToRgb from 'hex-to-rgb';

const INITIAL_HSBA_COLOR_STATE = { hue: 120, brightness: 1, saturation: 1, alpha: 1 };

export const INITIAL_COLORS_STATE = {
  textHSBA: INITIAL_HSBA_COLOR_STATE,
  backgroundHSBA: INITIAL_HSBA_COLOR_STATE,
};

export const convertFromHSBA = ({ backgroundHSBA, textHSBA }) => {
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

export const convertToHSBA = (bar) => {
  const backgroundHSBA = hexToHSBa(bar.backgroundColor, bar.backgroundOpacity);
  const textHSBA = hexToHSBa(bar.textColor, bar.textOpacity);

  return { backgroundHSBA, textHSBA };
};
