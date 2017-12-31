import * as React from "react";

export default class UIToggle extends React.Component<UIToggleProps, {}> {

    inputEl: HTMLInputElement;

    public static defaultProps = {
      className: "",
      disabled: false
    };

    render() {
      const {checked, onChange, disabled, onClick, onMouseOut} = this.props;
      return <span className={`uiToggle ${this.props.className}`}>
        <input
          type="checkbox"
          onChange={(e: any) => onChange(e.target.checked)}
          id="switch"
          checked={checked}
          disabled={disabled}
        />
        <label htmlFor="switch" onClick={onClick} onMouseOut={onMouseOut}>Toggle</label>
      </span>;
    }
}

export interface UIToggleProps extends React.Props<HTMLInputElement> {
  checked: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
  disabled?: boolean;
  onClick?: (event: any) => void;
  onMouseOut?: (event: any) => void;
}
