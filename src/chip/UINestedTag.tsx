import * as React from 'react';
import {findDOMNode} from 'react-dom';

import Colors from 'ququmber-ui/Colors';
import {isDarkColor} from 'ququmber-ui/utils/colorUtils';

const {useRef} = React;

const NestingMaskNode = (props: NestingMaskNodeProps) => {
  const {color, outline, rounded} = props;

  const roundedBaseStyle = {
    borderTopLeftRadius: '.25em',
    borderBottomLeftRadius: '.25em',
  };


  const nestingMaskBaseStyle: React.CSSProperties = {
    ...(rounded ? roundedBaseStyle : {}),
    width: '.25em',
    height: '100%',
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

  if (rounded) {
    return <div
      style={outline ? nestingMaskOutlineStyle : nestingMaskFilledStyle}
    />;
  } else {
    const sharedDiagonalStyle: any = {
      borderStyle: 'inset',
      borderWidth: '0 0 1.2em .6em',
      borderColor: `transparent transparent #${color} transparent`,
      position: 'absolute',
      bottom: 0,
      right: 0,
      height: 0,
    };

    return <>
      <div style={{
        ...sharedDiagonalStyle,
        width: '2px',
        borderColor: 'transparent transparent #ffffff transparent',
      }} />
      <div style={{
        ...sharedDiagonalStyle,
        width: '0',
        right: 0,
      }} />
    </>;
  }
};

type NestingMaskNodeProps = {
  outline: boolean;
  rounded: boolean;
  color: string;
};

const UINestedTag = (props: UINestedTagProps) => {
  const {onRemoved, canRemove, outline, items} = props;
  const rounded = props.rounded === true ? true : false;
  const removeButtonRef = useRef();

  const removeButton = (
    <button
      ref={removeButtonRef}
      className="remove"
      onClick={onRemoved ? onRemoved : () => {}}>
      <span className="octicon octicon-x" />
    </button>
  );

  const onClick = (event: React.MouseEvent, itemIndex: number) => {
    const item = props.items[itemIndex];
    const removeButtonEl = findDOMNode(removeButtonRef.current);
    const removeButtonClicked = removeButtonEl != null && removeButtonEl.contains(event.target as Node);
    const openLinkInNewTab = item.href && (event.ctrlKey || event.metaKey);
    if (props.onClick != null && !removeButtonClicked && !openLinkInNewTab) {
      props.onClick(item.id);
      event.preventDefault();
    }
  };

  return <div className="UINestedTag">{
    items.map((item, i) => {
      if (i >= items.length) {
        return null;
      }
      const isLast = i === items.length - 1;
      const nextItem = isLast ? null : items[i + 1];

      const className =
        (isLast ? 'UITag' : 'UINestedTagItem') + ' ' +
        (rounded ? 'rounded ' : '') +
        ((canRemove && isLast) ? 'canRemove ' : '');

      const color = item.color != null ? item.color : Colors.QUQUMBER.substring(1);

      const baseStyle: React.CSSProperties  = {
        ...((props.onClick || item.href) ? {cursor: 'pointer'} : {}),
        marginLeft: 0,
        position: 'relative',
        ...(rounded ? {left: `-${.125 * i}em`} : {}),
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

      const anchorInner = <div
        key={item.id}
        onClick={(e) => onClick(e, i)}
        className={className}
        style={style}>
        {item.label}
        {!isLast ? <>&nbsp;&nbsp;&nbsp;</> : null}
        {!isLast && <NestingMaskNode outline={outline} color={nextItem.color} rounded={rounded} />}
        {canRemove !== false && isLast && removeButton}
      </div>;

      if (item.href != null) {
        return <a key={item.id} href={item.href}>{anchorInner}</a>;
      }

      return anchorInner;
    })
  }</div>;
};

type UINestedTagPropsItem = {
  label: string,
  color?: string,
  id: number,
  href?: string
};

export type UINestedTagProps = {
  onRemoved?: () => void;
  items: Array<UINestedTagPropsItem>;
  canRemove?: boolean;
  onClick?: (id: number) => void;
  outline?: boolean;
  rounded?: boolean;
};

export default UINestedTag;
