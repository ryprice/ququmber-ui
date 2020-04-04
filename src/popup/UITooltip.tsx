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

    if (!open) {
      return children;
    }

    return <TetherComponent
      attachment={attachment}
      targetAttachment={targetAttachment}
      className="tether-theme-arrows-dark"
    >
      {children}
      <div
        className="UITooltip tether-content"
        style={{width: `${width}px`}}>
        <div className="UITooltipInner">
          {text}
        </div>
      </div>
    </TetherComponent>;
  }
}

export type UITooltipProps = {
  text: string;
  width?: number;
  open?: boolean;
  attachment?: string;
  targetAttachment?: string;
};

export default UITooltip;
