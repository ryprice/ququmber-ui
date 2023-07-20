import {css} from '@emotion/react';
import {includes} from 'lodash';
import * as React from 'react';

import {findDOMNode} from 'react-dom';
import UILoading from 'ququmber-ui/progress/UILoading';
import Stylings from 'ququmber-ui/Stylings';

const styles = {
  inputContainer: css`
    position: relative;
  `,
  loading: css`
    position: absolute;
    right: 10px;
    top: 12px;
  `
};

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
    if (this.props.autofocus) {
      setTimeout(() => this.inputEl.focus(), 10);
    }
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

  focusAndSelectAll() {
    this.inputEl.focus();
    this.inputEl.select();
  }

  clear() {
    (findDOMNode(this.inputEl) as HTMLInputElement).value = '';
  }

  render() {
    const {props} = this;
    const inputNode = <input
      style={props.style}
      className={`UITextInput styling-${props.styling} ${props.className}`}
      onKeyPress={(e) => this.onKeyPress(e)}
      ref={(el) => this.inputEl = el}
      defaultValue={props.value}
      placeholder={props.placeholder}
      onBlur={() => this.onBlur()}
      disabled={props.disabled}
      onChange={props.onChange}
    />;

    if (props.loading == null) {
      return inputNode;
    } else {
      return <div css={styles.inputContainer}>
        {inputNode}
        {props.loading && <div css={styles.loading}><UILoading size={18} color="#888888" /></div>}
      </div>;
    }
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
  loading?: boolean;
};

export default UITextInput;
