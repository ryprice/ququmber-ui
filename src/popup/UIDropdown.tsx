import {css, SerializedStyles} from '@emotion/react';
import * as React from 'react';

import Colors from 'ququmber-ui/Colors';
import {SHADOW_DROPDOWN} from 'ququmber-ui/Constants';
import useOnOutsideClick from 'ququmber-ui/utils/useOnOutsideClick';

const {useRef} = React;

const styles = {
  root: css`
    background: ${Colors.WHITE};
    box-shadow: ${SHADOW_DROPDOWN};
    border: 1px solid ${Colors.CONTROL};
    border-radius: 3px;
  `
};

const UIDropdown = (props: UIDropdownProps) => {
  const {children, open, className, onClose, css} = props;
  const rootRef = useRef();
  useOnOutsideClick([rootRef], onClose);

  return <div ref={rootRef}>
    {open ? <div css={[styles.root, css]} className={className}>{children}</div> : null}
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
