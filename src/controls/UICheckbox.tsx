import {SerializedStyles} from '@emotion/react';
import * as React from 'react';

const {useCallback} = React;

const UICheckbox = (props: UICheckboxProps) => {
  const {className, disabled, checked, css} = props;
  const propsOnChange = props.onChange;

  const onChange = useCallback((evt: any) => {
    propsOnChange && propsOnChange(evt.target.checked);
  }, [propsOnChange]);

  return <input
    css={css}
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
