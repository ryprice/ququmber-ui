import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TetherComponent from 'react-tether';

import UIDropdown from 'ququmber-ui/popup/UIDropdown';

class UIPopup extends React.Component<UIPopupProps, {}> {

  private contentRef: HTMLDivElement;

  public static defaultProps = {
    attachment: 'top right',
    targetAttachment: 'bottom right',
    closeOnOutsideClick: true
  };

  public componentWillReceiveProps(nextProps: UIPopupProps) {
    const {props} = this;

    if (!props.open && nextProps.open && props.closeOnOutsideClick) {
      // Delay it until the open click is completely handled. Adding
      // a click event Listener during click event handling apparently
      // fires the listener.
      setTimeout(() =>
        window.addEventListener('click', this.windowClickHandler, false)
      , 0);
    }

    if (props.open && !nextProps.open) {
      window.removeEventListener('click', this.windowClickHandler);
    }
  }

  windowClickHandler = (e: MouseEvent) => {
    const {onClose, open} = this.props;
    const thisEl = ReactDOM.findDOMNode(this.contentRef);
    const targetEl = e.target as Element;
    if (thisEl && !thisEl.contains(targetEl) && onClose && open) {
      onClose();
    }
  }

  render() {
    const {open, children, onClose, className, targetAttachment, attachment} = this.props;

    return open
    ? <TetherComponent
        attachment={attachment}
        targetAttachment={targetAttachment}
        className="tether-theme-arrows">
        {children[0]}
        <div
          ref={(ref: HTMLDivElement) => this.contentRef = ref}
          className={`${className} tether-content`}>
          {children[1]}
        </div>
      </TetherComponent>
    : children[0];
  }
}

interface UIPopupProps {
  open: boolean;
  children: JSX.Element[];
  onClose: () => void;
  className?: string;
  targetAttachment?: string;
  attachment?: string;
  closeOnOutsideClick: boolean;
}

export default UIPopup;
