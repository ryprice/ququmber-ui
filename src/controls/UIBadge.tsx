import * as React from 'react';

export class UIBadge extends React.Component<UIBadgeProps, {}> {
  render() {
    const {color, text} = this.props;
    return <span
      className="UIBadge"
      style={{backgroundColor: color}}>
      {text}
    </span>;
  }
}

export interface UIBadgeProps extends React.Props<UIBadge> {
  text: string;
  color: string;
}

export default UIBadge;
