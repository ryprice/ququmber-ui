import * as React from 'react';
import * as ReactDnd from 'react-dnd';

interface TaskFilterLinkProps {
  href?: string;
  onClick?: () => void;
  onDropTasks?: (taskIds: number[]) => void;
  children?: React.ReactNode;
}


const TaskFilterLink = (props: TaskFilterLinkProps) => {
  const {children, href, onDropTasks} = props;

  const [, dropRef] = ReactDnd.useDrop({
    accept: ['TASK'],
    drop: (item: any, monitor) => {
      if (monitor.getItemType() === 'TASK') {
        onDropTasks(item.taskIds);
      }
    },
    canDrop: (item: any, monitor) => {
      return onDropTasks && monitor.getItemType() === 'TASK';
    }
  });

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
