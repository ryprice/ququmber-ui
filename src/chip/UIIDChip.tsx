import * as React from 'react';

const UIIDChip = (props: UIIDChipProps) => {
  const {children, canClick} = props;
  return <div className={`UIIDChip ${canClick === false ? '' : 'clickable'}`}>
    {children}
  </div>;
};

type UIIDChipProps = {
  children: React.ReactNode;
  canClick?: boolean;
};

export default UIIDChip;