import * as React from 'react';
import {findDOMNode} from 'react-dom';

import Colors from 'ququmber-ui/Colors';
import {isDarkColor} from 'ququmber-ui/utils/colorUtils';

const {useRef} = React;

const UITag = (props: UITagProps) => {
  const {name, onRemoved, canRemove, outline} = props;
  const color = props.color != null ? props.color : Colors.QUQUMBER.substring(1);
  const removeButtonRef = useRef();

  const baseStyle = {
    ...(props.onClick ? {cursor: 'pointer'} : {})
  };

  const filledStyle = {
    ...baseStyle,
    background: `#${color}`,
    border: '0',
    color: isDarkColor(color) ? Colors.WHITE : Colors.BASEFONT,
  };
  const outlinedStyle = {
    ...baseStyle,
    background: 'transparent',
    border: `1px solid #${color}`,
    color: `#${color}`,
  };
  const style = outline === true ? outlinedStyle : filledStyle;

  const removeButton = (
    <button
      ref={removeButtonRef}
      className="remove"
      onClick={onRemoved ? onRemoved : () => {}}>
      <span className="octicon octicon-x" />
    </button>
  );

  const onClick = (e: React.MouseEvent) => {
    const removeButtonEl = findDOMNode(removeButtonRef.current);
    if (removeButtonEl == null || !removeButtonEl.contains(e.target as Node)) {
      props.onClick != null && props.onClick();
    }
  };

  const className = 'UITag ' + (canRemove ? 'canRemove ' : '');

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
  outline?: boolean;
}

export default UITag;
