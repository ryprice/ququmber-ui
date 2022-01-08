import * as React from 'react';

import Colors from 'ququmber-ui/Colors';


const UIProgressBar = (props: UIProgressBarProps) => {
  const {value} = props;
  const filledColor = props.filledColor ?? Colors.NOTIFY;

  return <div className="UIProgressBar">
    <div
      className="complete"
      style={{
        flexGrow: value,
        background: filledColor,
      }}
    />
    {value < 1 && <div
      className="incomplete"
      style={{flexGrow: 1 - value}}
    />}
  </div>;
};

type UIProgressBarProps = {
  value: number;
  filledColor?: string;
};

export default UIProgressBar;
