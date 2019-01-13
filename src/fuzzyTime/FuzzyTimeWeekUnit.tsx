import {times} from 'lodash';
import * as React from 'react';

import {FuzzyGranularity, FuzzyTime} from 'ququmber-api';

import FuzzyTimeSelectUnit, {
  FuzzyTimeSelectUnitProps,
  shouldUnitComponentUpdate
} from 'ququmber-ui/fuzzyTime/FuzzyTimeSelectUnit';
import {daysInMonth} from 'ququmber-ui/utils/dateUtils';

const emptyFn = () => {};

class FuzzyTimeWeekUnit extends React.Component<FuzzyTimeWeekUnitProps, {}> {

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

  shouldComponentUpdate(nextProps: FuzzyTimeWeekUnitProps, nextState: {}) {
    return shouldUnitComponentUpdate(this.props, this.state, nextProps, nextState);
  }

  render() {
    const week = this.props.time;
    const {month, hoverTime} = this.props;
    let curDay: FuzzyTime;
    let placeholderDaysCount;
    let daysCount;
    const numDaysInMonth = daysInMonth(
      month.getTime().getUTCMonth(),
      month.getTime().getUTCFullYear()
    );

    if (!week.withGranularity(FuzzyGranularity.MONTH).equals(month)) {
      // Place spots before first of the month
      curDay = month.withGranularity(FuzzyGranularity.DAY);
      placeholderDaysCount = curDay.getTime().getUTCDay();
      daysCount = 7 - curDay.getTime().getUTCDay();
    } else {
      curDay = week.withGranularity(FuzzyGranularity.DAY);
      placeholderDaysCount = 0;
      daysCount = Math.min(7, numDaysInMonth - curDay.getTime().getUTCDate() + 1);
    }

    const days = times(daysCount, () => {
      const prevDay = curDay;
      curDay = curDay.getNext();
      return prevDay;
    });

    return <div
      className={`weekContainer ${(hoverTime && hoverTime.equals(week)) ? 'weekContainerHover' : ''}`}>
      <div
        className="FuzzyTimeSelectUnit fullWeekButton"
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      />
      {times(placeholderDaysCount, () =>
        <div className="FuzzyTimeSelectUnit placeholder day" />
      )}
      {days.map(day =>
        <FuzzyTimeSelectUnit
          {...this.props}
          onMouseOver={emptyFn}
          onMouseOut={emptyFn}
          time={day}
          key={day.getTime().toString()}
          granularity={FuzzyGranularity.DAY}
        />
      )}
    </div>;
  }
}

export interface FuzzyTimeWeekUnitProps extends FuzzyTimeSelectUnitProps {
  month: FuzzyTime;
}

export default FuzzyTimeWeekUnit;
