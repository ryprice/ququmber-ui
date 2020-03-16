import * as React from 'react';

export class UIButtonFooter extends React.Component<UIButtonFooterProps, {}> {
  render() {
    return <div className="UIButtonFooter">
      {this.props.children}
    </div>;
  }
}

export interface UIButtonFooterProps extends React.Props<UIButtonFooter> {
  children: React.ReactNode;
}

export default UIButtonFooter;
