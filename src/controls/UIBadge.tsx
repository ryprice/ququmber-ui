import * as React from 'react';

import Colors from 'ququmber-ui/Colors';

import {isDarkColor} from 'ququmber-ui/utils/colorUtils';

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
