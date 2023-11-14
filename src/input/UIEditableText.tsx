import {css} from '@emotion/react';
import * as React from 'react';
import Colors from 'ququmber-ui/Colors';
import {UIAbstractInputStyle} from 'ququmber-ui/input/UIAbstractInput';

const styles = {
  root: css`
    border: 0;
    outline: 0;
    flex-grow: 1;
    padding: .4em 0;
    background: transparent;
    overflow: hidden;

    &.placeholder {
      color: ${Colors.QUIET};
      font-style: italic;
    }
  `,
  rootEnabled: css`
    &:hover {
      background: ${Colors.CONTROL};
    }

    &:focus {
      background: ${Colors.CONTROL_FOCUS};
    }
  `,
};

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
    if (this.inputEl.textContent !== this.props.value) {
      onSubmit && onSubmit(this.inputEl.textContent);
    }
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
    const {placeholder, value, onClick, onFocus, className, disabled} = this.props;
    const renderedClassName = `${className} ` + (this.shouldShowPlaceholder() ? 'placeholder' : '');

    return <p
      css={[UIAbstractInputStyle, styles.root, disabled ? null : styles.rootEnabled]}
      contentEditable={disabled ? false : true}
      className={renderedClassName}
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
};

export type UIEditableTextState = {
  value?: string;
};

export default UIEditableText;
