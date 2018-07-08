import * as React from "react";

export class UIToastNotificationArea extends React.Component<UIToastNotificationAreaProps, {}> {
  render() {
    return <div className="UIToastNotificationArea">
      {this.props.children}
    </div>;
  }
}

export interface UIToastNotificationAreaProps {
  children: React.ReactNode;
}

export default UIToastNotificationArea;
