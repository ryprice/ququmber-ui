import {css} from '@emotion/react';
import * as React from 'react';

import Colors from 'ququmber-ui/Colors';

const styles = {
  root: `
    border: 1px solid ${Colors.CONTROL};
    padding: 2px 5px;
    font-size: 1em;
    border-radius: 3px;
    display: inline-block;
  `,

  clickable: css`
    cursor: pointer;

    &:hover {
      background: ${Colors.CONTROL};
    }
  `
};

const UIIDChip = (props: UIIDChipProps) => {
  const {children, canClick} = props;
  return <div css={[styles.root, canClick === false ? null : styles.clickable]}>
    {children}
  </div>;
};

type UIIDChipProps = {
  children: React.ReactNode;
  canClick?: boolean;
};

export default UIIDChip;
