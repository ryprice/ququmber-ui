export const isDarkColor = (bgColor: string) => {
  const nThreshold = 130;
  const components = getRGBComponents(bgColor);
  const bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);

  return (255 - bgDelta) < nThreshold;
};

const getRGBComponents = (color: string) => ({
  R: parseInt(color.substring(0, 2), 16),
  G: parseInt(color.substring(2, 4), 16),
  B: parseInt(color.substring(4, 6), 16)
});
