import {SerializedStyles} from '@emotion/react';
import * as React from 'react';

export class UIEditableText extends React.Component<UIEditableTextProps, UIEditableTextState> {

  inputEl: HTMLParagraphElement;

  readonly state: UIEditableTextState = {
    value: null
  };

  public static defaultProps = {
    className: '',
    value: '',
    placeholder: ''
  };

  public componentDidMount() {
    const {autofocus} = this.props;
    if (autofocus) {
      this.inputEl.focus();
    }
  }

  public componentWillReceiveProps(nextProps: UIEditableTextProps) {
    if (this.props.value !== nextProps.value) {
      if (this.inputEl.textContent !== nextProps.value) {
        this.setState({value: nextProps.value ? nextProps.value : null});
      }
    }
  }

  onKeyUp = () => {
    this.props.onChange && this.props.onChange(this.inputEl.textContent);
  };

  onKeyPress = (event: React.KeyboardEvent<HTMLParagraphElement>) => {
    this.props.onChange && this.props.onChange(this.inputEl.textContent);
    switch (event.charCode) {
      case 13: // enter
        this.onSubmit();
        this.inputEl.blur();
        return false;
        break;
      default:
        break;
    }
    return true;
  };

  onSubmit() {
    const {onSubmit} = this.props;
    onSubmit && onSubmit(this.inputEl.textContent);
    this.setState({value: null});
  }

  onBlur = (e: React.FocusEvent<HTMLParagraphElement>) => {
    const {onBlur} = this.props;
    onBlur && onBlur(e);
    this.onSubmit();
  };

  shouldShowPlaceholder() {
    return this.state.value == null && !this.props.value;
  }

  render() {
    const {placeholder, value, onClick, onFocus, className, disabled, css} = this.props;
    const renderedClassName = (
      `UIEditableText ${className} ` +
      (this.shouldShowPlaceholder() ? 'placeholder' : '')
    );

    return <p
      contentEditable={disabled ? false : true}
      className={renderedClassName}
      css={css}
      onKeyUp={this.onKeyUp}
      onKeyPress={this.onKeyPress}
      ref={el => {
        this.inputEl = el;
      }}
      onBlur={this.onBlur}
      suppressContentEditableWarning={true}
      onFocus={e => {
        this.setState({value: value ? value : ''});
        onFocus && onFocus(e);
      }}
      onClick={onClick}
    >{this.state.value != null ? this.state.value : (value ? value : placeholder)}</p>;
  }
}

export type UIEditableTextProps = {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
  placeholder?: string;
  onClick?: (e: React.MouseEvent<HTMLParagraphElement>) => void;
  autofocus?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLParagraphElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLParagraphElement>) => void;
  disabled?: boolean;
  css?: SerializedStyles | SerializedStyles[];
};

export type UIEditableTextState = {
  value?: string;
};

export default UIEditableText;
