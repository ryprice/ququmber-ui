import * as React from 'react';

export class UIButtonFooter extends React.Component<UIButtonFooterProps, {}> {
  render() {
    return <div className="UIButtonFooter">
      {this.props.children}
    </div>;
  }
}

export type UIButtonFooterProps = {
  children: React.ReactNode;
};

export default UIButtonFooter;
