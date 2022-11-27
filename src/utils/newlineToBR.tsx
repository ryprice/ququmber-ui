const newlineToBR = (text: string) =>
  text.split('\n').map((line, key) =>
    <span key={key}>{line}<br /></span>
  );

export default newlineToBR;
