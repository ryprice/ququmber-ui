import * as React from "react";

export class UITextInput extends React.Component<UITextInputProps, {}> {

  inputEl: HTMLInputElement;

  public static defaultProps = {
    className: "",
    placeholder: "",
    value: "",
    disabled: false,
    style: {}
  };

  onKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    switch (event.charCode) {
      case 13: // enter
        this.onSubmit();
        break;
      default:
        break;
    }
    return true;
  }

  onSubmit() {
    const {onSubmit} = this.props;
    onSubmit && onSubmit(this.inputEl.value);
  }

  render() {
    const {props} = this;
    return <input
      style={props.style}
      className={`UITextInput ${props.className}`}
      onKeyPress={(e) => this.onKeyPress(e)}
      ref={(el) => this.inputEl = el}
      defaultValue={props.value}
      placeholder={props.placeholder}
      onBlur={() => this.onSubmit()}
      disabled={props.disabled}
      onChange={props.onChange}
    />;
  }
}

export interface UITextInputProps extends React.Props<HTMLInputElement> {
  value?: string;
  onSubmit?: (value: string) => void;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => boolean;
  style?: any;
}

export default UITextInput;
