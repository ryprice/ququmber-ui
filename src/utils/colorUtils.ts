/* eslint-disable no-bitwise, brace-style */

export const isDarkColor = (bgColor: string) => {
  const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  const {r, g, b} = getRGBComponents(color);
  let uicolors = [r / 255, g / 255, b / 255];
  let c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  let L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
  return L < 0.4;
};

const getRGBComponents = (color: string) => ({
  r: parseInt(color.substring(0, 2), 16),
  g: parseInt(color.substring(2, 4), 16),
  b: parseInt(color.substring(4, 6), 16)
});
