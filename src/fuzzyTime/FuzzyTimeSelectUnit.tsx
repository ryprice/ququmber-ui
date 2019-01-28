import {size} from 'lodash';
import * as React from 'react';

import {FuzzyGranularity, FuzzyTime, FuzzyTimeRange, Task} from 'ququmber-api';

import FuzzyTimeDnd from 'ququmber-ui/fuzzyTime/FuzzyTimeDnd';
import {shallowDifference} from 'ququmber-ui/utils/reactUtils';

export const unitClassName = (props: FuzzyTimeSelectUnitProps) => {
  const {disabled, hoverTime, time, multiselect, range, selected, start} = props;
  let className = '';
  className += disabled ? ' disabled' : '';
  className += hoverTime && hoverTime.overlaps(time) ? ' FuzzyTimeSelectUnitHover' : '';
  className += time.equals(FuzzyTime.getCurrent(time.getGranularity())) ? ' today' : '';
  className += time.equals(selected) ? ' selected' : '';
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
      onMouseOver, onMouseOut, hoverTime
    } = this.props;

    let className = 'FuzzyTimeSelectUnit';
    className += unitClassName(this.props);

    let name;
    let _onClick = onClick;
    switch(granularity) {
      case FuzzyGranularity.YEAR:
        className += ' year';
        name = time.getTime().getUTCFullYear().toString();
        break;

      case FuzzyGranularity.MONTH:
        className += ' month';
        name = time.getTime().toLocaleString('en-us', {month: 'short', timeZone: 'UTC'});
        break;

      case FuzzyGranularity.WEEK:
        _onClick = () => {};

      case FuzzyGranularity.DAY:
        className += ' day';
        name = time.getTime().getUTCDate().toString();
        break;

      default:
        name = 'Unknown/Forever?';
    }

    return (
      <FuzzyTimeDnd
        key={time.toString()}
        time={time}
        onTasksDropped={onTasksDropped}
      >
        <div
          className={className}
          onClick={this.onClick}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          <p>{name}</p>
        </div>
      </FuzzyTimeDnd>
    );
  }
}

export interface FuzzyTimeSelectUnitProps {
  time: FuzzyTime;
  disabled: boolean;
  onClick: (time: FuzzyTime) => void;
  range: FuzzyTimeRange;
  selected: FuzzyTime;
  multiselect: boolean;
  start: FuzzyTime;
  focalPoint: FuzzyTime;
  onTasksDropped: (tasks: Task[], time: FuzzyTime) => void;
  style?: Object;
  granularity: FuzzyGranularity;
  onMouseOver: (time: FuzzyTime) => void;
  onMouseOut: (time: FuzzyTime) => void;
  hoverTime: FuzzyTime;
}

export default FuzzyTimeSelectUnit;
