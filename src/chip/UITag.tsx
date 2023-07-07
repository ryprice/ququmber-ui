import {useRef} from 'react';
import {findDOMNode} from 'react-dom';

import Colors from 'ququmber-ui/Colors';
import {isDarkColor} from 'ququmber-ui/utils/colorUtils';

const UITag = (props: UITagProps) => {
  const {name, onRemoved, canRemove, outline, strikethrough} = props;
  const rounded = props.rounded === false ? false : true;
  const color = props.color != null ? props.color : Colors.QUQUMBER.substring(1);
  const removeButtonRef = useRef();

  const baseStyle = {
    ...(props.onClick ? {cursor: 'pointer'} : {}),
    ...(strikethrough ? {textDecoration:  'line-through'} : {}),
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

  const className = 'UITag ' + (rounded ? 'rounded ' : '') + (canRemove ? 'canRemove ' : '');

  return <div
    onClick={onClick}
    className={className}
    style={style}>
    {name}
    {canRemove !== false && removeButton}
  </div>;
};

export type UITagProps = {
  name: React.ReactChild;
  onRemoved?: () => void;
  color?: string;
  canRemove?: boolean;
  onClick?: () => void;
  outline?: boolean;
  rounded?: boolean;
  strikethrough?: boolean;
};

export default UITag;
