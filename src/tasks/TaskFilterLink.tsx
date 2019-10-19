import * as React from 'react';

interface TaskFilterLinkProps {
  href?: string;
  onClick?: () => void;
  onDropTasks?: (taskIds: number[]) => void;
  children?: React.ReactNode;
}


const TaskFilterLink = (props: TaskFilterLinkProps) => {
  const {children, href} = props;

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!(event.ctrlKey || event.metaKey) || !href) {
      props.onClick();
      event.preventDefault();
    }
  };

  return <a
    className="TaskFilterLink"
    href={href}
    onClick={onClick}>
    {children ? children : ''}
  </a>;
};

export default TaskFilterLink;
