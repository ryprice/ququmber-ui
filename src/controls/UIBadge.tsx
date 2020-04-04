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

export type UIBadgeProps = {
  text: string;
  color: string;
};

export default UIBadge;
