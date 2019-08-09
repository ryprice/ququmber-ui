import * as React from 'react';
import * as ReactDOM from 'react-dom';

import useOnOutsideClick from 'ququmber-ui/utils/useOnOutsideClick';

const {useCallback, useRef, useState} = React;

const UIDropdown = (props: UIDropdownProps) => {
  const {children, open, className, onClose} = props;
  const rootRef = useRef();
  useOnOutsideClick([rootRef], onClose);

  return <div ref={rootRef}>
    {open ? <div className={`UIDropdown ${className}`}>{children}</div> : null}
  </div>;
};

UIDropdown.defaultProps = {
  open: false,
  className: ''
};

export interface UIDropdownProps {
  children?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  className?: string;
}

export default UIDropdown;
