import * as React from 'react';

import Colors from 'ququmber-ui/Colors';
import {isDarkColor} from 'ququmber-ui/utils/colorUtils';

const {useRef} = React;

const UINestedTag = (props: UINestedTagProps) => {
  const {onRemoved, canRemove, outline, items, onClick} = props;
  const removeButtonRef = useRef();

  const removeButton = (
    <button
      ref={removeButtonRef}
      className="remove"
      onClick={onRemoved ? onRemoved : () => {}}>
      <span className="octicon octicon-x" />
    </button>
  );

  return <div className="UINestedTag">{
    items.map((item, i) => {
      if (i >= items.length) {
        return null;
      }
      const isLast = i === items.length - 1;

      const className =
        (isLast ? 'UITag' : 'UINestedTagItem') + ' ' +
        ((canRemove && isLast) ? 'canRemove ' : '');

      const color = item.color != null ? item.color : Colors.QUQUMBER.substring(1);

      const nestingMaskBaseStyle: React.CSSProperties = {
        width: '.25em',
        height: '100%',
        borderTopLeftRadius: '.25em',
        borderBottomLeftRadius: '.25em',
        position: 'absolute',
        right: '0px',
        background: '#ffffff',
      };

      const nestingMaskOutlineStyle: React.CSSProperties  = {
        ...nestingMaskBaseStyle,
        top: '-.05em',
        border: `.05em solid #${color}`,
        borderRight: 0,
      };

      const nestingMaskFilledStyle: React.CSSProperties  = {
        ...nestingMaskBaseStyle,
        top: 0,
        border: 0,
      };

      const nestingMaskNode =  <div
        style={outline ? nestingMaskOutlineStyle : nestingMaskFilledStyle}
      />;

      const baseStyle: React.CSSProperties  = {
        ...(onClick ? {cursor: 'pointer'} : {}),
        marginLeft: 0
      };

      const filledStyle: React.CSSProperties  = {
        ...baseStyle,
        background: `#${color}`,
        border: '1px',
        color: isDarkColor(color) ? Colors.WHITE : Colors.BASEFONT,
      };
      const outlinedStyle: React.CSSProperties  = {
        ...baseStyle,
        background: 'transparent',
        borderLeft: `1px solid #${color}`,
        borderTop: `1px solid #${color}`,
        borderBottom: `1px solid #${color}`,
        borderRight: isLast ? `1px solid #${color}` : '',
        marginLeft: isLast ? '0' : '',
        color: `#${color}`
      };
      const style = outline === true ? outlinedStyle : filledStyle;

      return <div
        key={item.id}
        onClick={() => onClick(item.id)}
        className={className}
        style={style}>
        {item.label}
        {!isLast ? <>&nbsp;&nbsp;&nbsp;</> : null}
        {!isLast && nestingMaskNode}
        {canRemove !== false && isLast && removeButton}
      </div>;
    })
  }</div>;
};

export type UINestedTagProps = {
  onRemoved?: () => void;
  items: Array<{label: string, color?: string, id: number}>;
  canRemove?: boolean;
  onClick?: (id: number) => void;
  outline?: boolean;
};

export default UINestedTag;
