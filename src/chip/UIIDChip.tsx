import * as React from 'react';

const UIIDChip = (props: UIIDChipProps) => {
  const {children} = props;
  return <div className="UIIDChip">
    {children}
  </div>;
};

type UIIDChipProps = {
  children: React.ReactChildren
};

export default UIIDChip;