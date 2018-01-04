import * as React from "react";
import * as ReactDnd from "react-dnd";

import {FuzzyTime, Task} from "ququmber-api";

class PrivateFuzzyTimeDnd extends React.Component<FuzzyTimeDndProps, {}> {
    public render(): JSX.Element {
        // const unitClasses = (this.props.canDrop && this.props.isOver) ? " droppingTask" : "";
        return this.props.connectDropTarget(this.props.children as React.ReactElement<any>);
    }
}

export interface FuzzyTimeDndProps {
    time: FuzzyTime;
    connectDropTarget?: ReactDnd.ConnectDropTarget;
    onTasksDropped?: (tasks: Task[], time: FuzzyTime) => void;
    isOver?: boolean;
    canDrop?: boolean;
    children?: React.ReactNode;
}

const dropTargetSpec: ReactDnd.DropTargetSpec<FuzzyTimeDndProps> = {
    drop: (props: FuzzyTimeDndProps, monitor: ReactDnd.DropTargetMonitor, component: PrivateFuzzyTimeDnd) => {
        const tasks = monitor.getItem() as Task[];
        props.onTasksDropped(tasks, props.time);
    },
    canDrop: (props: FuzzyTimeDndProps, monitor: ReactDnd.DropTargetMonitor) => {
        return !!props.onTasksDropped;
    }
};


const dropTargetCollector: ReactDnd.DropTargetCollector = (connect: ReactDnd.DropTargetConnector, monitor: ReactDnd.DropTargetMonitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
};

export default ReactDnd.DropTarget("TASK", dropTargetSpec, dropTargetCollector)(
    PrivateFuzzyTimeDnd
);
