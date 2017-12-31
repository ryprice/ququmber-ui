import * as React from "react";

export class UIEditableText extends React.Component<UIEditableTextProps, UIEditableTextState> {

  inputEl: HTMLParagraphElement;

  constructor(props: UIEditableTextProps, context: any) {
    super(props, context);
    this.state = {value: null};
  }

  public static defaultProps = {
    className: "",
    value: "",
    placeholder: ""
  };

  public componentWillReceiveProps(nextProps: UIEditableTextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({value: nextProps.value ? nextProps.value : null});
    }
  }

  onKeyPress(event: React.KeyboardEvent<HTMLParamElement>) {
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
    onSubmit && onSubmit(this.inputEl.innerHTML);
    this.setState({value: null});
  }

  onChange(value: string) {
    console.log(value);
    this.setState({value});
  }

  shouldShowPlaceholder() {
    return this.state.value == null && !this.props.value;
  }

  render() {
    const {placeholder, value, onClick} = this.props;

    return <p
      contentEditable={true}
      onChange={(e: any) => this.onChange(e)}
      className={`uiEditableText ${this.props.className} ${this.shouldShowPlaceholder() ? 'placeholder' : ''}`}
      onKeyPress={(e: any) => this.onKeyPress(e)}
      ref={(el) => this.inputEl = el}
      onBlur={() => this.onSubmit()}
      suppressContentEditableWarning ={true}
      onFocus={() => this.setState({value: value ? value : ''})}
      onClick={onClick}
    >{this.state.value != null ? this.state.value : (value ? value : placeholder)}</p>;
  }
}

export interface UIEditableTextProps extends React.Props<HTMLInputElement> {
    value?: string;
    onSubmit?: (value: string) => void;
    className?: string;
    placeholder?: string;
    onClick?: () => void;
}

export interface UIEditableTextState {
    value?: string;
}

export default UIEditableText;
