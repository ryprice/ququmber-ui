import * as React from "react";

export class UIIconButton extends React.Component<UIIconButtonProps, {}> {

  public static defaultProps = {
    className: "",
    disabled: false
  };

  render() {
    const {className, onClick, disabled, icon} = this.props;

    return <button
      className={`UIIconButton ${this.props.className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <i className={icon} />
    </button>;
  }
}

export interface UIIconButtonProps {
  icon: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default UIIconButton;
