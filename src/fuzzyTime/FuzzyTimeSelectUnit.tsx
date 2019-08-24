import {size} from 'lodash';
import * as React from 'react';

import {FuzzyGranularity, FuzzyTime, FuzzyTimeRange, Task} from 'ququmber-api';

import {shallowDifference} from 'ququmber-ui/utils/reactUtils';

export const unitClassName = (props: FuzzyTimeSelectUnitProps) => {
  const {disabled, hoverTime, time, multiselect, range, selected, start} = props;
  let className = '';
  if (disabled) {
    className += ' disabled';
  }
  if (
    hoverTime &&
    !hoverTime.equals(FuzzyTime.getForever()) &&
    hoverTime.contains(time)
  ) {
    className += ' hover';
  }
  if (time.equals(FuzzyTime.getCurrent(time.getGranularity()))) {
    className += ' now';
  }
  if (
    selected &&
    !selected.equals(FuzzyTime.getForever()) &&
    (time.equals(selected) || selected.contains(time))
  ) {
    className += ' selected';
  }
  if (multiselect) {
    className += (range && range.contains(time)) ? ' selected' : '';
    if (start) {
      className += time.equals(start) ? ' selected' : '';
    } else if (
      range &&
      (!range.getStart() || time.compareTo(range.getStart()) >= 0) &&
      (!range.getEnd() || time.compareTo(range.getEnd()) <= 0)
    ) {
      className += ' selected';
    }
  }
  return className;
};

export const shouldUnitComponentUpdate = (
  props: FuzzyTimeSelectUnitProps,
  state: any,
  nextProps: FuzzyTimeSelectUnitProps,
  nextState: any
): boolean => {
  const propsDiff = shallowDifference(nextProps, props);
  const stateDiff = shallowDifference(nextState, state);
  if (size(stateDiff) === 0 && size(propsDiff) === 0) {
    return false;
  }
  if (size(propsDiff) === 1 && propsDiff.hoverTime) {
    const relatedToHoverTime = (
      props.hoverTime &&
      props.hoverTime.overlaps(props.time)
    );
    const relatedToNextHoverTime = (
      nextProps.hoverTime &&
      nextProps.hoverTime.overlaps(nextProps.time)
    );
    return relatedToHoverTime || relatedToNextHoverTime;
  }
  return true;
};

class FuzzyTimeSelectUnit extends React.Component<FuzzyTimeSelectUnitProps, {}> {

  onClick = () => {
    const {time, onClick} = this.props;
    onClick(time);
  }

  onMouseOver = () => {
    const {time, onMouseOver} = this.props;
    onMouseOver(time);
  }

  onMouseOut = () => {
    const {time, onMouseOut} = this.props;
    onMouseOut(time);
  }

  shouldComponentUpdate(nextProps: FuzzyTimeSelectUnitProps, nextState: {}) {
    return shouldUnitComponentUpdate(this.props, this.state, nextProps, nextState);
  }

  render() {
    const {
      time, disabled, onClick, range, onTasksDropped,
      selected, multiselect, start, focalPoint, granularity,
      onMouseOver, onMouseOut, hoverTime, children
    } = this.props;

    let className = 'FuzzyTimeSelectUnit';
    className += unitClassName(this.props);
    if (this.props.className) {
      className += ' ' + this.props.className;
    } else {
      switch(granularity) {
        case FuzzyGranularity.YEAR:
          className += ' year';
          break;

        case FuzzyGranularity.MONTH:
          className += ' month';
          break;

        case FuzzyGranularity.DAY:
          className += ' day';
          break;
      }
    }

    let name;
    switch(granularity) {
      case FuzzyGranularity.YEAR:
        name = time.getTime().getUTCFullYear().toString();
        break;

      case FuzzyGranularity.MONTH:
        name = time.getTime().toLocaleString('en-us', {month: 'short', timeZone: 'UTC'});
        break;

      case FuzzyGranularity.DAY:
        name = time.getTime().getUTCDate().toString();
        break;

      default:
        name = 'Unknown/Forever?';
    }

    return (
      <div
        className={className}
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        {children || name}
      </div>
    );
  }
}

export interface FuzzyTimeSelectUnitProps {
  time: FuzzyTime;
  disabled: boolean;
  selected: FuzzyTime;
  granularity: FuzzyGranularity;
  hoverTime: FuzzyTime;
  focalPoint: FuzzyTime;
  range?: FuzzyTimeRange;
  multiselect: boolean;
  start: FuzzyTime;

  style?: Object;
  children?: React.ReactNode;
  className?: string;

  onClick: (time: FuzzyTime) => void;
  onMouseOver: (time: FuzzyTime) => void;
  onMouseOut: (time: FuzzyTime) => void;
  onTasksDropped: (tasks: Task[], time: FuzzyTime) => void;
}

export default FuzzyTimeSelectUnit;
