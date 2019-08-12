import * as React from 'react';
import {findDOMNode} from 'react-dom';

import Colors from 'ququmber-ui/Colors';
import {isDarkColor} from 'ququmber-ui/utils/colorUtils';

const {useRef} = React;

const UITag = (props: UITagProps) => {
  const {name, onRemoved, canRemove, outline} = props;
  const color = props.color != null ? props.color : Colors.QUQUMBER;
  const removeButtonRef = useRef();

  const filledStyle = {
    background: `#${color}`,
    border: `0`,
    color: isDarkColor(color) ? Colors.WHITE : Colors.BASEFONT,
  };
  const outlinedStyle = {
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
    if (!findDOMNode(removeButtonRef.current).contains(e.target as Node)) {
      props.onClick();
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
