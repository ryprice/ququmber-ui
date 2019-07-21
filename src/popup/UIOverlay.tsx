import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class UIOverlayPortal extends React.Component<React.Props<UIOverlayPortal>, {}> {
  render() {
    return <div className="UIOverlay">
      <div className="content">
        {this.props.children}
      </div>
      <div className="background" />
    </div>;
  }
}

export class UIOverlay extends React.Component<UIOverlayProps, {}> {
  private node: HTMLElement;

  constructor(props: UIOverlayProps) {
    super(props);
    this.node = document.createElement('div');
  }

  componentDidMount () {
    document.body.appendChild(this.node);
  }

  componentWillUnmount () {
    document.body.removeChild(this.node);
  }

  render() {
    return ReactDOM.createPortal(
      <UIOverlayPortal {...this.props} />,
      this.node
    );
  }
}

export interface UIOverlayProps extends React.Props<UIOverlay> {

}

export default UIOverlay;
