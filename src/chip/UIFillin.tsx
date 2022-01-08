import * as React from 'react';

type UIFillinProps = {
  children: React.ReactNode;
};

const UIFillin = (props: UIFillinProps) => {
  return <span className="UIFillin">
    {props.children}
  </span>;
};

export default UIFillin;