import * as React from "react";

export class UIButton extends React.Component<UIButtonProps, {}> {

  inputEl: HTMLInputElement;

  public static defaultProps = {
    className: "",
    placeholder: "",
    value: "",
    disabled: false
  };

  render() {
    const {className, onClick, children} = this.props;
    return <button
      className={`uiButton ${this.props.className}`}
      onClick={onClick}>
      {children}
    </button>;
  }
}

export interface UIButtonProps extends React.Props<HTMLInputElement> {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export default UIButton;
