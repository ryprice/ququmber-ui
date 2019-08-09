import * as React from 'react';
import {findDOMNode} from 'react-dom';

import {isDarkColor} from 'ququmber-ui/utils/colorUtils';

const {useRef} = React;

const UITag = (props: UITagProps) => {
  const {color, name, onRemoved, canRemove} = props;
  const removeButtonRef = useRef();
  const style = color ? {background: `#${color}`} : {};

  const removeButton = (
    <button
      ref={removeButtonRef}
      className="remove"
      onClick={onRemoved ? onRemoved : () => {}}>
      <span className="octicon octicon-x" />
    </button>
  );

  const onClick = (e: React.MouseEvent) => {
    if (!findDOMNode(removeButtonRef.current).contains(e.target as Node)) {
      props.onClick();
    }
  };

  const className = (
    'UITag ' +
    (!color || isDarkColor(color) ? 'lightText ' : 'darkText ') +
    (canRemove ? 'canRemove ' : '')
  );

  return <div
    onClick={onClick}
    className={className}
    style={style}>
    {name}
    {canRemove !== false && removeButton}
  </div>;
};

export interface UITagProps {
  name: React.ReactChild;
  onRemoved?: () => void;
  color?: string;
  canRemove?: boolean;
  onClick?: () => void;
}

export default UITag;
