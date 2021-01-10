import * as React from 'react';
import TetherComponent from 'react-tether';

import useOnOutsideClick from 'ququmber-ui/utils/useOnOutsideClick';

const {useRef} = React;

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
        className="UITooltip tether-content"
        style={{width: `${width}px`}}>
        <div className="UITooltipInner">
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
