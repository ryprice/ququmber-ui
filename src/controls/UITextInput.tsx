import * as React from "react";

export class UITextInput extends React.Component<UITextInputProps, {}> {

  inputEl: HTMLInputElement;

  public static defaultProps = {
    className: "",
    placeholder: "",
    value: "",
    disabled: false
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
    return <input
      className={`UITextInput ${this.props.className}`}
      onKeyPress={(e) => this.onKeyPress(e)}
      ref={(el) => this.inputEl = el}
      defaultValue={this.props.value}
      placeholder={this.props.placeholder}
      onBlur={() => this.onSubmit()}
      disabled={this.props.disabled}
      onChange={this.props.onChange}
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
}

export default UITextInput;
