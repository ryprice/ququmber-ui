import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class UIDropdown extends React.Component<UIDropdownProps, {}> {

  private boundWindowClickHandler: (e: MouseEvent) => void;

  public static defaultProps = {
    open: false,
    className: ''
  };

  public constructor(props: UIDropdownProps, context: any) {
    super(props, context);
    this.boundWindowClickHandler = (e) => this.windowClickHandler(e);
  }

  public componentWillReceiveProps(nextProps: UIDropdownProps) {
    if (!this.props.open && nextProps.open) {
      // Delay it until the open click is completely handled. Adding
      // a click event Listener during click event handling apparently
      // fires the listener.
      setTimeout(() =>
        window.addEventListener('click', this.boundWindowClickHandler, false)
      , 0);
    }

    if (this.props.open && !nextProps.open) {
      window.removeEventListener('click', this.boundWindowClickHandler);
    }
  }

  private windowClickHandler(e: MouseEvent) {
    const {onClose, open} = this.props;
    const thisEl = ReactDOM.findDOMNode(this);
    const targetEl = e.target as Element;
    if (thisEl && !thisEl.contains(targetEl) && onClose && open) {
      onClose(e);
    }
  }

  render() {
    const {children, open, className} = this.props;
    return <div>
      {open ? <div className={`UIDropdown ${className}`}>{children}</div> : null}
    </div>;
  }
}

export interface UIDropdownProps {
  children?: JSX.Element | JSX.Element[];
  open?: boolean;
  onClose?: (e: MouseEvent) => void;
  className?: string;
}

export default UIDropdown;
