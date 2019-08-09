import * as React from 'react';

import UIMountTransition from 'ququmber-ui/utils/UIMountTransition';

const UIModal = (props: UIModalProps) => {
  const {onClose, className, children, open} = props;

  const closeButton = <button
    className="closeButton"
    onClick={onClose}>
    &times;
  </button>;

  return <UIMountTransition mounted={open} className="UIModalTransition">
    <div className={`UIModal ${className || ''}`}>
      {onClose ? closeButton : null}
      {children}
    </div>
  </UIMountTransition>;
};

export interface UIModalProps {
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
  open?: boolean;
}

UIModal.defaultProps = {
  open: true,
};

export default UIModal;
