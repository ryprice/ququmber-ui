import {css} from '@emotion/react';

import Colors from 'ququmber-ui/Colors';

const styles = {
  root: css`
    display: inline;
    padding: .2em .6em .3em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color: ${Colors.WHITE};
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25em;
  `,
};

const UIBadge = (props: UIBadgeProps) => {
  const {color, text} = props;
  return <span
    css={styles.root}
    style={{backgroundColor: color}}>
    {text}
  </span>;
};

export type UIBadgeProps = {
  text: string;
  color: string;
};

export default UIBadge;
