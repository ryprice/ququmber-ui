import {css} from '@emotion/react';
import * as React from 'react';
import TetherComponent from 'react-tether';

import Colors from 'ququmber-ui/Colors';
import useOnOutsideClick from 'ququmber-ui/utils/useOnOutsideClick';

const {useRef} = React;

const styles = {
  root: css`
    color: ${Colors.QUIET};
  `,
  inner: css`
    padding: .3em .6em;
  `,
};

const UITooltip = (props: UITooltipProps) => {
  const {children, text, width, open, attachment,targetAttachment, closeOnOutsideClick, onClose} = props;
  const tooltipRef = useRef<HTMLDivElement>();

  useOnOutsideClick([tooltipRef], onClose, closeOnOutsideClick && open);

  if (!open) {
    return <>{children}</>;
  }

  return (
    <TetherComponent
      attachment={attachment}
      targetAttachment={targetAttachment}
      className="tether-theme-arrows-dark">
      {children}
      <div
        ref={tooltipRef}
        css={styles.root}
        className="tether-content"
        style={{width: `${width}px`}}>
        <div css={styles.inner}>
          {text}
        </div>
      </div>
    </TetherComponent>
  );
};

UITooltip.defaultProps = {
  width: 200,
  open: false,
  attachment: 'top center',
  targetAttachment: 'bottom center'
};

export type UITooltipProps = {
  text: string;
  width?: number;
  open?: boolean;
  attachment?: string;
  targetAttachment?: string;
  onClose?: () => void;
  children: React.ReactNode;
  closeOnOutsideClick?: boolean;
};

export default UITooltip;
