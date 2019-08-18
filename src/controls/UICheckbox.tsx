import * as React from 'react';

const {useCallback} = React;

const UICheckbox = (props: UICheckboxProps) => {
  const {className, disabled, checked} = props;

  const onChange = useCallback((evt: any) => {
    props.onChange && props.onChange(evt.target.checked);
  }, [props.onChange]);

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
