import * as React from "react";
import * as ReactDOM from 'react-dom';

export class UIOverlayPortal extends React.Component<React.Props<UIOverlayPortal>, {}> {
    render() {
        return <div className="uiOverlay">
            <div className="content">
                {this.props.children}
            </div>
            <div className="background" />
        </div>;
    }
}

export class UIOverlay extends React.Component<UIOverlayProps, {}> {
    private node: HTMLElement;

    componentDidMount () {
        this.node = document.createElement('div');
        document.body.appendChild(this.node);
        this.renderPortal(this.props);
    }

    componentWillUnmount () {
        ReactDOM.unmountComponentAtNode(this.node);
        document.body.removeChild(this.node);
    }

    componentWillReceiveProps(newProps: UIOverlayProps) {
        this.renderPortal(newProps);
    }

    renderPortal(props: UIOverlayProps) {
        ReactDOM.unstable_renderSubtreeIntoContainer(this, (
            <UIOverlayPortal {...props} />
        ), this.node);
    }

    public render(): JSX.Element {
        return null;
    }
}

export interface UIOverlayProps extends React.Props<UIOverlay> {

}
