import * as React from 'react';

import UIMountTransition from 'ququmber-ui/utils/UIMountTransition';

const UIModal = (props: UIModalProps) => {
  const {onClose, className, children, open, style} = props;

  const closeButton = <button
    className="closeButton"
    onClick={onClose}>
    &times;
  </button>;

  return <UIMountTransition mounted={open} className="UIModalTransition">
    <div className={`UIModal ${className || ''}`} style={style} >
      {onClose ? closeButton : null}
      {children}
    </div>
  </UIMountTransition>;
};

export type UIModalProps = {
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
  open?: boolean;
  style?: object;
};

UIModal.defaultProps = {
  open: true,
};

export default UIModal;
