import * as React from "react";

import UILoading from 'ququmber-ui/controls/UILoading';

export class UIButton extends React.Component<UIButtonProps, {}> {

  inputEl: HTMLInputElement;

  public static defaultProps = {
    className: "",
    placeholder: "",
    value: "",
    disabled: false,
    style: {},
    color: 'control',
    loading: false
  };

  render() {
    const {
      className, onClick, children, style,
      color, disabled, id, loading
    } = this.props;

    const loadingSize = 20;

    return <button
      className={`UIButton ${this.props.className} color-${color}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
      id={id}
    >
      <span className="inner">{children}</span>
      {loading && <div
        style={{
          height: "13px", // font size
          width: `${loadingSize}px`,
          position: 'relative',
          display: 'inline-block'
        }}>
          <UILoading size={loadingSize} />
        </div>
      }
    </button>;
  }
}

export interface UIButtonProps extends React.Props<HTMLInputElement> {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  style?: object;
  color?: string;
  disabled?: boolean;
  id?: string;
  loading?: boolean;
}

export default UIButton;
