import * as React from 'react';

export class UIModal extends React.Component<UIModalProps, {}> {
  render() {
    const {onClose, className} = this.props;

    const closeButton = <button
      className="closeButton"
      onClick={onClose}>
      &times;
    </button>;

    return <div className={`UIModal ${className || ''}`}>
      {onClose ? closeButton : null}
      {this.props.children}
    </div>;
  }
}

export interface UIModalProps extends React.Props<UIModal> {
  onClose?: () => void;
  className?: string;
}

export default UIModal;
