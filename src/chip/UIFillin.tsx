import {css} from '@emotion/react';
import * as React from 'react';

import Colors from 'ququmber-ui/Colors';

const styles = {
  root: css`
    background: ${Colors.CONTROL};
    padding: .1em .4em;
    border-bottom: 1px #888888 solid;
  `
};

type UIFillinProps = {
  children: React.ReactNode;
};

const UIFillin = (props: UIFillinProps) => {
  return <span css={styles.root}>
    {props.children}
  </span>;
};

export default UIFillin;
