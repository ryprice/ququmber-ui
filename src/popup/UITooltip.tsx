import * as React from 'react';
import TetherComponent from 'react-tether';

export class UITooltip extends React.Component<UITooltipProps, {}> {

  public static defaultProps = {
    width: 200,
    open: false,
    attachment: 'top center',
    targetAttachment: 'bottom center'
  };

  public render() {
    const {children, text, width, open, attachment, targetAttachment} = this.props;
    return <TetherComponent
      attachment={attachment}
      targetAttachment={targetAttachment}
      className="tether-theme-arrows-dark"
    >
      {children}
      {open && (
        <div
          className="UITooltip tether-content"
          style={{width: `${width}px`}}>
          {text}
        </div>
      )}
    </TetherComponent>;
  }
}

export interface UITooltipProps {
  text: string;
  width?: number;
  open?: boolean;
  attachment?: string;
  targetAttachment?: string;
}

export default UITooltip;
