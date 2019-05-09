import * as React from 'react';
import * as ReactDOM from 'react-dom';

import useOnOutsideClick from 'ququmber-ui/utils/useOnOutsideClick';

const {useCallback, useRef, useState} = React;

const defaultProps = {
  open: false,
  className: ''
};

const UIDropdown = (props: UIDropdownProps = defaultProps) => {
  const {children, open, className, onClose} = props;
  const rootRef = useRef();
  useOnOutsideClick([rootRef], onClose);
  return <div ref={rootRef}>
    {open ? <div className={`UIDropdown ${className}`}>{children}</div> : null}
  </div>;
};

export interface UIDropdownProps {
  children?: JSX.Element | JSX.Element[];
  open?: boolean;
  onClose?: () => void;
  className?: string;
}

export default UIDropdown;
