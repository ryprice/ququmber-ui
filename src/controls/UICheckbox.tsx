import {css, SerializedStyles} from '@emotion/react';
import * as React from 'react';
import Colors from 'ququmber-ui/Colors';
import {BORDER_RADIUS_INPUT} from 'ququmber-ui/Constants';

const {useCallback} = React;

const styles = {
  root: css`
    width: 1.5em;
    height: 1.5em;
    appearance: none;
    -webkit-appearance: none;
    color: ${Colors.BLACK};
    -moz-appearance: none;
    outline: 0;
    border: 1px solid ${Colors.CONTROL_BORDER};
    cursor: pointer;
    position: relative;
    border-radius: ${BORDER_RADIUS_INPUT};

    &:before {
      position: absolute;
      content: '';
      display: block;
      top: .1em;
      left: .35em;
      width: .4em;
      height: .7em;
      transform: rotate(45deg);
      opacity: 0;
      border-style: solid;
      border-color: ${Colors.BASEFONT};
      border-width: 0 .2em .2em 0;
    }
    
    &:checked {
      &:before {
        opacity: 1;
      }
    }
  `
};

const UICheckbox = (props: UICheckboxProps) => {
  const {className, disabled, checked, css} = props;
  const propsOnChange = props.onChange;

  const onChange = useCallback((evt: any) => {
    propsOnChange && propsOnChange(evt.target.checked);
  }, [propsOnChange]);

  return <input
    css={[styles.root, css]}
    className={`UICheckbox ${className || ''}`}
    type="checkbox"
    onChange={onChange}
    disabled={disabled}
    checked={checked}
  />;
};

type UICheckboxProps = {
  onChange?: (value: boolean) => void;
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  css?: SerializedStyles
};

UICheckbox.defaultProps = {
  disabled: false
};

export default UICheckbox;
