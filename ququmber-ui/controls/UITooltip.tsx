import * as React from "react";
import TetherComponent from "react-tether";

export class UITooltip extends React.Component<UITooltipProps, {}> {

    public static defaultProps = {
        width: 200,
        open: false
    };

    public render() {
        const {children, text, width, open, attachment} = this.props;
        return <TetherComponent
            attachment={attachment || 'top center'}
            targetAttachment="bottom center"
            className="tether-theme-arrows-dark"
        >
            {children}
            {open ? <div className="uiTooltip tether-content" style={{width: `${width}px`}}>{text}</div> : null}
        </TetherComponent>;
    }
}

export interface UITooltipProps {
    text: string;
    width?: number;
    open?: boolean;
    attachment?: string;
}

export default UITooltip;
