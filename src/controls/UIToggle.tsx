import {css} from '@emotion/react';
import {useMemo} from 'react';

import Colors from 'ququmber-ui/Colors';
import {TRANSITION_DEFAULT} from 'ququmber-ui/Constants';
import {isDarkColor} from 'ququmber-ui/utils/colorUtils';

const styles = {
  label: css`
    cursor: pointer;
    text-indent: -9999px;
    width: 2.2em;
    height: 1.1em;
    background: ${Colors.CONTROL_SELECTED};
    display: block;
    border-radius: 1.1em;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      top: .05em;
      left: .05em;
      width: .6em;
      height: .6em;
      background: transparent;
      border-radius: 1em;
      transition: ${TRANSITION_DEFAULT};
      border: .2em solid ${Colors.BASEFONT};
    }
    
    &:active:after {
      width: .8em;
    }
  `,
  input: css`
    height: 0;
    width: 0;
    visibility: hidden;
    margin: 0;
    display: none;

    &:checked + label {
      background: ${Colors.CONTROL_SELECTED};
    }

    :checked + label:after {
      left: calc(100% - .05em);
      transform: translateX(-100%);
    }

    :checked + label.dark:after {
      background: ${Colors.BASEFONT};
    }

    :checked + label.light:after {
      background: ${Colors.WHITE};
    }
  `
};

let nextIdIndex = 0;

const UIToggle = (props: UIToggleProps) => {
  const {checked, onChange, disabled, onClick, onMouseOut, checkedColor} = props;

  const idIndex = useMemo(() => {
    const result = nextIdIndex;
    nextIdIndex++;
    return result;
  }, []);
  const id = 'UIToggle-' + idIndex;

  return <span>
    <input
      css={styles.input}
      type="checkbox"
      onChange={(e: any) => onChange(e.target.checked)}
      id={id}
      checked={checked}
      disabled={disabled}
    />
    <label
      css={styles.label}
      className={`label ${checkedColor && isDarkColor(checkedColor) ? 'light' : 'dark'}`}
      htmlFor={id}
      onClick={onClick}
      onMouseOut={onMouseOut}
      style={checked && checkedColor ? {background: checkedColor} : {}}>
      Toggle
    </label>
  </span>;
};

UIToggle.defaultProps = {
  className: '',
  disabled: false
};

export type UIToggleProps = {
  checked: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
  disabled?: boolean;
  onClick?: (event: any) => void;
  onMouseOut?: (event: any) => void;
  checkedColor?: string;
};

export default UIToggle;
