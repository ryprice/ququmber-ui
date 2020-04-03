import * as React from 'react';

const {useCallback} = React;

const UICheckbox = (props: UICheckboxProps) => {
  const {className, disabled, checked} = props;
  const propsOnChange = props.onChange;

  const onChange = useCallback((evt: any) => {
    propsOnChange && propsOnChange(evt.target.checked);
  }, [propsOnChange]);

  return <input
    className={`UICheckbox ${className || ''}`}
    type="checkbox"
    onChange={onChange}
    disabled={disabled}
    checked={checked}
  />;
};

interface UICheckboxProps {
  onChange?: (value: boolean) => void;
  className?: string;
  disabled?: boolean;
  checked?: boolean;
}

UICheckbox.defaultProps = {
  disabled: false
};

export default UICheckbox;
