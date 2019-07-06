import { rgbToHsb, hsbToRgb } from '@shopify/polaris'

const INITIAL_HSBA_COLOR_STATE = { hue: 120, brightness: 1, saturation: 1, alpha: 1 }

export const hsbToRgbString = hsb => {
  const rgbMap = hsbToRgb(hsb)

  return `rgba(${rgbMap.red},${rgbMap.green},${rgbMap.blue},${hsb.alpha})`
}

export const rgbStringToHsb = rgb => {
  if (!rgb) {
    return INITIAL_HSBA_COLOR_STATE
  }

  const values = rgb
    .slice(5, -1)
    .split(',')
    .map(Number)
  const hsb = rgbToHsb({
    red: values[0],
    green: values[1],
    blue: values[2],
  })

  return { ...hsb, alpha: values[3] }
}
