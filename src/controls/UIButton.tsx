import * as React from "react";

export class UIButton extends React.Component<UIButtonProps, {}> {

  inputEl: HTMLInputElement;

  public static defaultProps = {
    className: "",
    placeholder: "",
    value: "",
    disabled: false,
    style: {},
    color: 'control'
  };

  render() {
    const {className, onClick, children, style, color} = this.props;
    return <button
      className={`UIButton ${this.props.className} color-${color}`}
      onClick={onClick}
      style={style}>
      {children}
    </button>;
  }
}

export interface UIButtonProps extends React.Props<HTMLInputElement> {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  style?: object;
  color?: string;
}

export default UIButton;
