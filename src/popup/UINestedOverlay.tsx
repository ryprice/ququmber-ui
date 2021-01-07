import * as React from 'react';

const UINestedOverlay = (props: UINestedOverlayProps) => {
  const {children} = props;
  return (
    <div className="UINestedOverlay">
      <div className="background" />
      {children}
    </div>
  );
};

type UINestedOverlayProps = {
  children: React.ReactNode;
}

export default UINestedOverlay;