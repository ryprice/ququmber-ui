import * as React from 'react';
import * as ReactDOM from 'react-dom';

import UIMountTransition from 'ququmber-ui/utils/UIMountTransition';

const UIOverlayPortal = (props: UIOverlayProps) => {
  return <UIMountTransition className="UIOverlayTransition" mounted={props.open}>
    <div className="UIOverlay">
      <div className="content">
        {props.children}
      </div>
      <div className="background" />
    </div>
  </UIMountTransition>;
};

export class UIOverlay extends React.Component<UIOverlayProps, {}> {

  private readonly node: HTMLElement;

  static defaultProps = {
    open: true,
  };

  constructor(props: UIOverlayProps) {
    super(props);
    this.node = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.node);
  }

  componentWillUnmount() {
    document.body.removeChild(this.node);
  }

  render() {
    if (this.props.debugInline) {
      return this.props.children;
    }
    return ReactDOM.createPortal(
      <UIOverlayPortal {...this.props} />,
      this.node
    );
  }
}

export interface UIOverlayProps {
  open?: boolean;
  children: React.ReactNode;
  debugInline?: boolean;
}

export default UIOverlay;
