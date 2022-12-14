import {includes} from 'lodash';
import * as React from 'react';

import Stylings from 'ququmber-ui/Stylings';

export const SubmitBehaviors = {
  BLUR: 1,
  ENTER: 2
};

export class UITextInput extends React.Component<UITextInputProps, {}> {

  inputEl: HTMLInputElement;

  public static defaultProps = {
    className: '',
    placeholder: '',
    value: '',
    disabled: false,
    style: {},
    autofocus: false,
    submitBehaviors: [
      SubmitBehaviors.BLUR,
      SubmitBehaviors.ENTER
    ]
  };

  componentDidMount() {
    this.inputEl.focus();
  }

  onKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    switch (event.charCode) {
      case 13: // enter
        if (includes(this.props.submitBehaviors, SubmitBehaviors.ENTER)) {
          this.onSubmit();
        }
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

  onBlur() {
    if (includes(this.props.submitBehaviors, SubmitBehaviors.BLUR)) {
      this.onSubmit();
    }
  }

  render() {
    const {props} = this;
    return <input
      style={props.style}
      className={`UITextInput styling-${props.styling} ${props.className}`}
      onKeyPress={(e) => this.onKeyPress(e)}
      ref={(el) => this.inputEl = el}
      defaultValue={props.value}
      placeholder={props.placeholder}
      onBlur={() => this.onBlur()}
      disabled={props.disabled}
      onChange={props.onChange}
      autoFocus={props.autofocus}
    />;
  }
}

export type UITextInputProps = {
  value?: string;
  onSubmit?: (value: string) => void;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => boolean | void;
  style?: any;
  autofocus?: boolean;
  submitBehaviors?: number[];
  styling?: Stylings;
};

export default UITextInput;
