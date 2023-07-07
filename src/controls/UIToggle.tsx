import {useMemo} from 'react';

let nextIdIndex = 0;

const UIToggle = (props: UIToggleProps) => {
  const {checked, onChange, disabled, onClick, onMouseOut} = props;

  const idIndex = useMemo(() => {
    const result = nextIdIndex;
    nextIdIndex++;
    return result;
  }, []);
  const id = 'UIToggle-' + idIndex;

  return <span className={`UIToggle ${props.className}`}>
    <input
      type="checkbox"
      onChange={(e: any) => onChange(e.target.checked)}
      id={id}
      checked={checked}
      disabled={disabled}
    />
    <label htmlFor={id} onClick={onClick} onMouseOut={onMouseOut}>Toggle</label>
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
};

export default UIToggle;
