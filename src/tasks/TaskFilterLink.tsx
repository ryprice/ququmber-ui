import * as React from 'react';

type TaskFilterLinkProps = {
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const TaskFilterLink = React.forwardRef<HTMLAnchorElement, TaskFilterLinkProps>((props, ref) => {
  const {children, href} = props;

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!(event.ctrlKey || event.metaKey) || !href) {
      props.onClick();
      event.preventDefault();
    }
  };

  return <a
    ref={ref}
    className="TaskFilterLink"
    href={href}
    onClick={onClick}>
    {children ? children : ''}
  </a>;
});

export default TaskFilterLink;
