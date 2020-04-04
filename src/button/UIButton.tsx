import * as React from 'react';

import UILoading from 'ququmber-ui/controls/UILoading';
import Stylings from 'ququmber-ui/Stylings';

export class UIButton extends React.Component<UIButtonProps, {}> {

  inputEl: HTMLInputElement;

  public static defaultProps = {
    className: '',
    placeholder: '',
    value: '',
    disabled: false,
    style: {},
    styling: Stylings.CONTROL,
    loading: false,
  };

  render() {
    const {
      className, onClick, children, style,
      styling, disabled, id, loading
    } = this.props;

    return <button
      className={`UIButton ${className} styling-${styling}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
      id={id}
    >
      <span className="inner">{children}</span>
      {loading && (
        <div className="loadingContainer">
          <UILoading />
        </div>
      )}
    </button>;
  }
}

export type UIButtonProps = {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  style?: object;
  styling?: Stylings;
  disabled?: boolean;
  id?: string;
  loading?: boolean;
};

export default UIButton;
