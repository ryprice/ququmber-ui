import * as React from 'react';

import {isDarkColor} from 'ququmber-ui/utils/colorUtils';

export class UITag extends React.Component<UITagProps, {}> {
  render() {
    const {color, name, onRemoved, canRemove} = this.props;
    const style = color ? {background: `#${color}`} : {};

    const removeButton = (
      <button
        className="remove"
        onClick={onRemoved ? onRemoved : () => {}}
      >
        <span className="octicon octicon-x" />
      </button>
    );

    return <div
      className={`UITag ${!color || isDarkColor(color) ? 'lightText' : 'darkText'}`}
      style={style}>
      {name}
      {canRemove !== false && removeButton}
    </div>;
  }
}

export interface UITagProps extends React.Props<UITag> {
  name: string;
  onRemoved?: () => void;
  color?: string;
  canRemove?: boolean;
}

export default UITag;
