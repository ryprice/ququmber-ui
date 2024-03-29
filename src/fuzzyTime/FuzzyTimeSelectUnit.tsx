import {SerializedStyles, css} from '@emotion/react';
import {size} from 'lodash';
import * as React from 'react';

import {FuzzyGranularity, FuzzyTime, FuzzyTimeRange} from 'listlab-api';

import {shallowDifference} from 'ququmber-ui/utils/reactUtils';

export const unitClassName = (props: FuzzyTimeSelectUnitProps) => {
  const {disabled, hoverTime, time, multiselect, selectedRange, selected, nextRangeStart} = props;
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
  if (multiselect && !nextRangeStart) {
    className += (selectedRange && selectedRange.contains(time)) ? ' selected' : '';
    if (
      selectedRange &&
      (!selectedRange.getStart() || time.compareTo(selectedRange.getStart()) >= 0) &&
      (!selectedRange.getEnd() || time.compareTo(selectedRange.getEnd()) <= 0)
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

const styles = {
  root: css`
    &:hover:not(.placeholder) {
      cursor: pointer
    }
  `,
};

class FuzzyTimeSelectUnit extends React.Component<FuzzyTimeSelectUnitProps, {}> {

  onClick = () => {
    const {time, onClick} = this.props;
    onClick(time);
  };

  onMouseOver = () => {
    const {time, onMouseOver} = this.props;
    onMouseOver(time);
  };

  onMouseOut = () => {
    const {time, onMouseOut} = this.props;
    onMouseOut(time);
  };

  shouldComponentUpdate(nextProps: FuzzyTimeSelectUnitProps, nextState: {}) {
    return shouldUnitComponentUpdate(this.props, this.state, nextProps, nextState);
  }

  render() {
    const {
      time, children, granularity, multiselect, hoverTime,
      nextRangeStart, css, cssHoverRangeEnd, cssHoverRangeStart
    } = this.props;

    let className = unitClassName(this.props);
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    let name;
    switch (granularity) {
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

    const hoverTimeForRange = (
      multiselect &&
      hoverTime &&
      hoverTime.equals(time) &&
      time.getGranularity() === FuzzyGranularity.DAY
    );
    const isHoverRangeStart = (hoverTimeForRange && !nextRangeStart) || (
      nextRangeStart &&
      nextRangeStart.equals(time) &&
      time.getGranularity() === FuzzyGranularity.DAY
    );
    const isHoverRangeEnd = hoverTimeForRange && nextRangeStart;

    return (
      <div
        css={Array.isArray(css) ? [styles.root, ...css] : [styles.root, css]}
        className={className}
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        {isHoverRangeStart ? <div css={cssHoverRangeStart} /> : null}
        {isHoverRangeEnd ? <div css={cssHoverRangeEnd} /> : null}
        {children || name}
      </div>
    );
  }
}

export type FuzzyTimeSelectUnitProps = {
  time: FuzzyTime;
  disabled: boolean;
  selected: FuzzyTime;
  granularity: FuzzyGranularity;
  hoverTime: FuzzyTime;
  focalPoint: FuzzyTime;
  selectedRange?: FuzzyTimeRange;
  multiselect: boolean;
  nextRangeStart: FuzzyTime;

  style?: Object;
  children?: React.ReactNode;
  className?: string;
  css?: SerializedStyles | SerializedStyles[];
  cssHoverRangeStart?: SerializedStyles | SerializedStyles[];
  cssHoverRangeEnd?: SerializedStyles | SerializedStyles[];

  onClick: (time: FuzzyTime) => void;
  onMouseOver: (time: FuzzyTime) => void;
  onMouseOut: (time: FuzzyTime) => void;
};

export default FuzzyTimeSelectUnit;
