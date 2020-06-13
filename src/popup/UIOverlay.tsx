import * as React from 'react';
import * as ReactDOM from 'react-dom';

import UIMountTransition from 'ququmber-ui/utils/UIMountTransition';

const {useCallback, useRef} = React;

const UIOverlayPortal = (props: UIOverlayProps) => {
  const contentContainerRef = useRef<HTMLDivElement>();
  const onOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (contentContainerRef.current === e.target) {
      props.onOverlayClick();
    }
  }, [props.onOverlayClick]);

  return <UIMountTransition className="UIOverlayTransition" mounted={props.open}>
    <div className="UIOverlay">
      <div
        className="content"
        onClick={onOverlayClick}
        ref={contentContainerRef}>
        {props.children}
      </div>
      <div className="background"/>
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

export type UIOverlayProps = {
  open?: boolean;
  children: React.ReactNode;
  debugInline?: boolean;
  onOverlayClick?: () => void;
};

export default UIOverlay;
