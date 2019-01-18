import * as React from 'react';
import * as ReactDnd from 'react-dnd';

class PrivateTaskFilterLink extends React.Component<TaskFilterLinkProps, {}>  {
  onClick = (event: React.MouseEvent<HTMLElement>) => {
    const {onClick, href} = this.props;
    if (!(event.ctrlKey || event.metaKey) || !href) {
      onClick();
      event.preventDefault();
    }
  }

  render() {
    const {children, href, connectDropTarget} = this.props;
    return connectDropTarget(
      <a
        className="TaskFilterLink"
        href={href}
        onClick={this.onClick}>
        {children ? children : ''}
      </a>
    );
  }
}

export interface TaskFilterLinkProps {
    href?: string;
    onClick?: () => void;
    onDropTasks?: (taskIds: number[]) => void;
    children?: React.ReactNode;

    canDrop?: boolean;
    connectDropTarget?: ReactDnd.ConnectDropTarget;
    isOver?: boolean;
}

const dropTargetSpec: ReactDnd.DropTargetSpec<TaskFilterLinkProps> = {
  drop: (props: TaskFilterLinkProps, monitor: ReactDnd.DropTargetMonitor, component: PrivateTaskFilterLink) => {
    const item = monitor.getItem() as any;
    if (monitor.getItemType() === 'TASK') {
      props.onDropTasks(item.taskIds);
    }
  },
  canDrop: (props: TaskFilterLinkProps, monitor: ReactDnd.DropTargetMonitor) => {
    return props.onDropTasks && monitor.getItemType() === 'TASK';
  }
};

const dropTargetCollector: ReactDnd.DropTargetCollector = (
  connect: ReactDnd.DropTargetConnector,
  monitor: ReactDnd.DropTargetMonitor
) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});

export default ReactDnd.DropTarget('TASK', dropTargetSpec, dropTargetCollector)(
  PrivateTaskFilterLink
);
