import {times} from 'lodash';
import * as React from 'react';

import {FuzzyGranularity, FuzzyTime} from 'ququmber-api';

import FuzzyTimeSelectUnit, {
  FuzzyTimeSelectUnitProps,
  shouldUnitComponentUpdate
} from 'ququmber-ui/fuzzyTime/FuzzyTimeSelectUnit';
import FuzzyTimeWeekUnit from 'ququmber-ui/fuzzyTime/FuzzyTimeWeekUnit';
import {weeksInMonth} from 'ququmber-ui/utils/dateUtils';

class FuzzyTimeMonthUnit extends React.Component<FuzzyTimeSelectUnitProps, {}> {

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
    const month = this.props.time;
    const {style, onClick, hoverTime} = this.props;

    const weeksCount: number = weeksInMonth(
      month.getTime().getUTCMonth(),
      month.getTime().getUTCFullYear()
    );
    const weeks: FuzzyTime[] = [];
    let curWeek = month.withGranularity(FuzzyGranularity.WEEK);
    times(weeksCount, () => {
      weeks.push(curWeek);
      curWeek = curWeek.getNext();
    });

    return <div
      className={`FuzzyTimeMonthUnit ${(hoverTime && hoverTime.equals(month)) ? 'FuzzyTimeMonthUnitHover' : ''}`}
      style={style}>
      <div style={{clear: 'both'}} key="clear" />
      <div
        className="monthTitle"
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        key="title">
        {month.getTime().toLocaleString('en-us', {month: 'long', timeZone: 'UTC'})}
      </div>
      {weeks.map(week =>
        <FuzzyTimeWeekUnit
          {...this.props}
          time={week}
          month={month}
          key={week.getTime().toString()}
          granularity={FuzzyGranularity.MONTH}
        />
      )}
    </div>;
  }
}

export default FuzzyTimeMonthUnit;
