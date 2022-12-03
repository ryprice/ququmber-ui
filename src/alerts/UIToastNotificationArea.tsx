import {css} from '@emotion/react';
import * as React from 'react';

const styles = {
  root: css`
    position: fixed;
    z-index: 10;
    bottom: 1rem;
    left: 1rem;
  `
};

const UIToastNotificationArea = (props: UIToastNotificationAreaProps) =>
  <div css={styles.root}>
    {props.children}
  </div>;

export type UIToastNotificationAreaProps = {
  children: React.ReactNode;
};

export default UIToastNotificationArea;
