type UIShimmerRectProps = {
  className?: string;
  style?: Object
};

const UIShimmerRect = (props: UIShimmerRectProps) => {
  const {className, style} = props;

  return <div className={`UIShimmerRect ${className ?? ''}`} style={style}>
    <div className="outer">
      <div className="inner" />
    </div>
  </div>;
};

export default UIShimmerRect;