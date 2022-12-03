import {css} from '@emotion/react';
import * as React from 'react';
import Colors from 'ququmber-ui/Colors';

const styles = {
  root: css`
    color: ${Colors.BASEFONT};
    text-decoration: underline;
    cursor: pointer;

    &:visited {
      color: ${Colors.BASEFONT};
    }

    &:hover,
    &:visited:hover {
      color: ${Colors.BLACK};
    }
  `
};

type TaskFilterLinkProps = {
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
};

const TaskFilterLink = React.forwardRef<HTMLAnchorElement, TaskFilterLinkProps>((props, ref) => {
  const {children, href} = props;

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!(event.ctrlKey || event.metaKey) || !href) {
      props.onClick(event);
      event.preventDefault();
    }
  };

  return <a
    ref={ref}
    css={styles.root}
    href={href}
    onClick={onClick}>
    {children ? children : ''}
  </a>;
});

export default TaskFilterLink;
