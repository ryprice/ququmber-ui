
import {Global, css} from '@emotion/react';
import * as React from 'react';
import Colors from 'ququmber-ui/Colors';
import {SHADOW_MODAL} from 'ququmber-ui/Constants';
import UIMountTransition from 'ququmber-ui/utils/UIMountTransition';

export const PADDING_MODAL = '30';

const styles = {
  root: css`
    background: ${Colors.WHITE};
    box-shadow: ${SHADOW_MODAL};
    overflow: auto;
    position: relative;
    border-radius: 3px;
  `,
  closeButton: css`
    border: 0;
    background: transparent;
    font-size: 30px;
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
    cursor: pointer;
    z-index: 10;
    line-height: 17px;
  `,
};

const UIModal = (props: UIModalProps) => {
  const {onClose, className, children, open, style} = props;

  const closeButton = <button
    css={styles.closeButton}
    onClick={onClose}>
    &times;
  </button>;

  return <>
    <Global styles={css`
      .UIModalTransition-appear {
        transform: translate3d(0, -10px, 0);
      }

      .UIModalTransition-appear.UIModalTransition-appear-active {
        transform: translate3d(0, 0, 0);
        transition: .2s;
      }

      .UIModalTransition-enter {
        transform: translate3d(0, -10px, 0);
      }

      .UIModalTransition-enter.UIModalTransition-enter-active {
        transform: translate3d(0, 0, 0);
        transition: .2s;
      }

      .UIModalTransition-leave {
        transform: translate3d(0, 0, 0);
      }

      .UIModalTransition-leave.UIModalTransition-leave-active {
        transform: translate3d(0, -10px, 0);
        transition: .2s;
      }
    `} />
    <UIMountTransition mounted={open} className="UIModalTransition">
      <div css={styles.root} className={className} style={style} >
        {onClose ? closeButton : null}
        {children}
      </div>
    </UIMountTransition>;
  </>;
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
