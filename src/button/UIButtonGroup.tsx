import {css} from '@emotion/react';
import * as React from 'react';

import {MutableRefObject, forwardRef} from 'react';

const styles = {
  root: css`
    display: flex;
    flex-direction: row;
  `
};

const UIButtonGroup = forwardRef((props: UIButtonGroupProps, ref: MutableRefObject<HTMLDivElement>) => {
  const {children, className, style} = props;

  return <div
    css={styles.root}
    ref={ref}
    className={`${className != null ? className : ''}`}
    style={style}>
    {children}
  </div>;
});

export type UIButtonGroupProps = {
  className?: string;
  children?: React.ReactNode;
  style?: object;
};

export default UIButtonGroup;
