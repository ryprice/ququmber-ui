import * as React from 'react';

const UIToastNotificationArea = (props: UIToastNotificationAreaProps) =>
  <div className="UIToastNotificationArea">
    {props.children}
  </div>;

export type UIToastNotificationAreaProps = {
  children: React.ReactNode;
};

export default UIToastNotificationArea;
