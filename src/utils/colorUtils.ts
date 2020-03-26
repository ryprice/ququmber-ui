/* eslint-disable no-bitwise, brace-style */

export const isDarkColor = (bgColor: string) => {
  const nThreshold = 130;
  const components = getRGBComponents(bgColor);
  const bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);

  return !((255 - bgDelta) < nThreshold);
};

const getRGBComponents = (color: string) => ({
  R: parseInt(color.substring(0, 2), 16),
  G: parseInt(color.substring(2, 4), 16),
  B: parseInt(color.substring(4, 6), 16)
});

export const lightenDarkenColor = (hex: string, amt: number) => {
  let usePound = false;
  let hexWithoutPound = hex;
  if (hex[0] === '#') {
    hexWithoutPound = hex.slice(1);
    usePound = true;
  }
  const components = getRGBComponents(hexWithoutPound);

  let r = components.R + amt;
  if (r > 255) { r = 255; }
  else if  (r < 0) { r = 0; }

  let g = components.G + amt;
  if (g > 255) { g = 255; }
  else if (g < 0) { g = 0; }

  let b = components.B + amt;
  if (b > 255) { b = 255; }
  else if  (b < 0) { b = 0; }

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};
