import {css} from '@emotion/react';
import * as React from 'react';
import Colors from 'ququmber-ui/Colors';

const styles = {
  root: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10000;
    align-items: center;
    justify-content: center;
    display: flex;
  `,
  background: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    background: ${Colors.BLACK};
    opacity: .2;
  `
};

const UINestedOverlay = (props: UINestedOverlayProps) => {
  const {children} = props;
  return (
    <div css={styles.root}>
      <div css={styles.background} />
      {children}
    </div>
  );
};

type UINestedOverlayProps = {
  children: React.ReactNode;
};

export default UINestedOverlay;
