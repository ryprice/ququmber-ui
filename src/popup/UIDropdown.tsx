import {css, SerializedStyles} from '@emotion/react';
import {forwardRef, useRef, ReactNode} from 'react';
import {mergeRefs} from 'react-merge-refs';

import Colors from 'ququmber-ui/Colors';
import {SHADOW_DROPDOWN} from 'ququmber-ui/Constants';
import useOnOutsideClick from 'ququmber-ui/utils/useOnOutsideClick';

const styles = {
  root: css`
    background: ${Colors.WHITE};
    box-shadow: ${SHADOW_DROPDOWN};
    border: 1px solid ${Colors.CONTROL};
    border-radius: 3px;
  `
};

const UIDropdown = forwardRef<HTMLDivElement, UIDropdownProps>((props: UIDropdownProps, ref) => {
  const {children, open, className, onClose, css} = props;
  const rootRef = useRef();
  useOnOutsideClick([rootRef], onClose);

  return <div ref={mergeRefs([rootRef, ref])}>
    {open ? <div css={[styles.root, css]} className={className}>{children}</div> : null}
  </div>;
});

UIDropdown.defaultProps = {
  open: false,
  className: ''
};

export type UIDropdownProps = {
  children?: ReactNode;
  open?: boolean;
  onClose?: () => void;
  className?: string;
  css?: SerializedStyles;
};

export default UIDropdown;
