import {css} from '@emotion/react';
import * as React from 'react';

import Colors from 'ququmber-ui/Colors';

const styles = {
  root: css`
    overflow: auto;
    background: ${Colors.OFFWHITE};
    padding: 1em 2em;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1em;

    button: {
      margin-right: 1em;
    }

    button:last-child {
      margin-right: 0
    }
  `
};

export class UIButtonFooter extends React.Component<UIButtonFooterProps, {}> {
  render() {
    return <div css={styles.root}>
      {this.props.children}
    </div>;
  }
}

export type UIButtonFooterProps = {
  children: React.ReactNode;
};

export default UIButtonFooter;
