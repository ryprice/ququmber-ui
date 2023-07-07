import {css} from '@emotion/react';
import * as React from 'react';
import {useCallback, useRef} from 'react';
import * as ReactDOM from 'react-dom';

import Colors from 'ququmber-ui/Colors';
import UIMountTransition from 'ququmber-ui/utils/UIMountTransition';

const styles = {
  root: css`
position: fixed;
width: 100%;
height: 100%;
z-index: 1000;
top: 0;
left: 0;
  `,
  background: css`
  position: fixed;
  width: 100%;
  height: 100%;
  background: ${Colors.BLACK};
  opacity: 0.4;
  z-index: 0;
  `,
  content: css`
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  `,
};

const UIOverlayPortal = (props: UIOverlayProps) => {
  const propsOnOverlayClick = props.onOverlayClick;
  const contentContainerRef = useRef<HTMLDivElement>();
  const onOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (propsOnOverlayClick != null && contentContainerRef.current === e.target) {
      propsOnOverlayClick();
    }
  }, [propsOnOverlayClick]);
  const classNamespace = props.classNamespace || '';

  return <span className={classNamespace}>
    <UIMountTransition className="UIOverlayTransition" mounted={props.open}>
      <div css={styles.root}>
        <div
          css={styles.content}
          onClick={onOverlayClick}
          ref={contentContainerRef}>
          {props.children}
        </div>
        <div css={styles.background} />
      </div>
    </UIMountTransition>
  </span>;
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
  classNamespace?: string;
};

export default UIOverlay;
