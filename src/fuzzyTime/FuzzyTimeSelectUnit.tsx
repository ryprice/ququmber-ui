import * as React from 'react';

import {FuzzyGranularity, FuzzyTime, FuzzyTimeRange, Task} from 'ququmber-api';

import FuzzyTimeDnd from 'ququmber-ui/fuzzyTime/FuzzyTimeDnd';

export const FuzzyTimeSelectUnit = (props: FuzzyTimeSelectUnitProps) => {
  const {
    time, disabled, onClick, range, onTasksDropped,
    selected, multiselect, start, focalPoint, granularity,
    onMouseOver, onMouseOut
  } = props;

  let className = 'FuzzyTimeSelectUnit';
  className += disabled ? ' disabled' : '';
  className += time.equals(FuzzyTime.getCurrent(time.getGranularity())) ? ' today' : '';
  className += time.equals(selected) ? ' selected' : '';
  if (multiselect) {
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
        onClick={() => _onClick(time)}
        onMouseOver={() => onMouseOver(time)}
        onMouseOut={() => onMouseOut(time)}
      >
        <p>{name}</p>
      </div>
    </FuzzyTimeDnd>
  );
};

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
  style: Object;
  granularity: FuzzyGranularity;
  onMouseOver: (time: FuzzyTime) => void;
  onMouseOut: (time: FuzzyTime) => void;
  hoverTime: FuzzyTime;
}

export default FuzzyTimeSelectUnit;
