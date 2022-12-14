import {SerializedStyles} from '@emotion/react';
import * as React from 'react';

import useOnOutsideClick from 'ququmber-ui/utils/useOnOutsideClick';

const {useRef} = React;

const UIDropdown = (props: UIDropdownProps) => {
  const {children, open, className, onClose, css} = props;
  const rootRef = useRef();
  useOnOutsideClick([rootRef], onClose);

  return <div ref={rootRef}>
    {open ? <div css={css} className={`UIDropdown ${className}`}>{children}</div> : null}
  </div>;
};

UIDropdown.defaultProps = {
  open: false,
  className: ''
};

export type UIDropdownProps = {
  children?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  className?: string;
  css?: SerializedStyles;
};

export default UIDropdown;
