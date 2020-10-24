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
      this.setState({value: nextProps.value ? nextProps.value : null});
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

  shouldShowPlaceholder() {
    return this.state.value == null && !this.props.value;
  }

  render() {
    const {placeholder, value, onClick, onFocus, className, disabled} = this.props;
    const renderedClassName = (
      `UIEditableText ${className} ` +
      (this.shouldShowPlaceholder() ? 'placeholder' : '')
    );

    return <p
      contentEditable={disabled ? false : true}
      className={renderedClassName}
      onKeyUp={this.onKeyUp}
      onKeyPress={this.onKeyPress}
      ref={(el) => {
        this.inputEl = el;
      }}
      onBlur={() => this.onSubmit()}
      suppressContentEditableWarning={true}
      onFocus={() => {
        this.setState({value: value ? value : ''});
        onFocus && onFocus();
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
  onClick?: () => void;
  autofocus?: boolean;
  onFocus?: () => void;
  disabled?: boolean;
};

export type UIEditableTextState = {
  value?: string;
};

export default UIEditableText;
