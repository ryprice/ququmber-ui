import {css} from '@emotion/react';

const styles = {
  root: css`
    padding: .1em .1em;
    font-weight: bold;
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
