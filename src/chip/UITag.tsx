import {css} from '@emotion/react';
import {useRef} from 'react';
import {findDOMNode} from 'react-dom';
import Colors from 'ququmber-ui/Colors';
import {isDarkColor} from 'ququmber-ui/utils/colorUtils';

export const styles = {
  root: css`
    margin: .1em;
    padding: .1em .7em;
    display: inline-block;
    line-height: 1em;
  `,
  rounded: css`
    border-radius: .25em;
  `,
  canRemove: css`
    &:hover,
    &:focus {
      padding: .1em .2em;
      
      .removeButton {
        display: inline-block;
      }
    }
  `,
  removeButton: css`
    overflow: hidden;
    margin: 0 .15em 0 .3em;
    background: transparent;
    border: 0;
    outline: 0;
    padding: 0;
    color: inherit;
    line-height: .6em;
    font-size: .8em;
    vertical-align: center;
    display: none;

    span {
      font-size: 1.1em
    }
  `
};

const UITag = (props: UITagProps) => {
  const {name, onRemoved, canRemove, outline, strikethrough} = props;
  const rounded = props.rounded === false ? false : true;
  const color = props.color != null ? props.color : Colors.QUQUMBER;
  const removeButtonRef = useRef();

  const baseStyle = {
    ...(props.onClick ? {cursor: 'pointer'} : {}),
    ...(strikethrough ? {textDecoration:  'line-through'} : {}),
  };

  const filledStyle = {
    ...baseStyle,
    background: color,
    border: '0',
    color: isDarkColor(color) ? Colors.WHITE : Colors.BASEFONT,
  };
  const outlinedStyle = {
    ...baseStyle,
    background: 'transparent',
    border: `1px solid ${color}`,
    color,
  };
  const style = outline === true ? outlinedStyle : filledStyle;

  const removeButton = (
    <button
      css={styles.removeButton}
      ref={removeButtonRef}
      className="removeButton"
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

  const className = 'UITag ' + (rounded ? 'rounded ' : '') + (canRemove ? 'canRemove ' : '') + (props.className || '');

  return <div
    css={[styles.root, rounded ? styles.rounded : null, canRemove ? styles.canRemove : null]}
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
  className?: string;
};

export default UITag;
