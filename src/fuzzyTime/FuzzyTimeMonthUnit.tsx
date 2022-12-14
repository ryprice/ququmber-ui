import {css} from '@emotion/react';
import {times} from 'lodash';
import * as React from 'react';

import {FuzzyGranularity, FuzzyTime} from 'listlab-api';

import Colors from 'ququmber-ui/Colors';
import FuzzyTimeSelectUnit, {
  FuzzyTimeSelectUnitProps,
  shouldUnitComponentUpdate
} from 'ququmber-ui/fuzzyTime/FuzzyTimeSelectUnit';
import FuzzyTimeWeekUnit from 'ququmber-ui/fuzzyTime/FuzzyTimeWeekUnit';
import {weeksInMonth} from 'ququmber-ui/utils/dateUtils';

const styles = {
  root: css`
    float: none;
    clear: both;
    overflow: hidden;
  `,
  monthTitle: css`
    clear: both;
    padding: 4px 0 4px 9%;
    margin-top: 30px;
    font-size: 13px;
    text-transform: uppercase;
    font-weight: normal;
    color: ${Colors.BASEFONT};
    cursor: pointer;
    border-bottom: ${Colors.BR} 1px solid;
    border-top: ${Colors.QUIET} 1px solid;

    &.hover {
      font-weight: bold;
    }

    &.selected {
      color: ${Colors.NOTIFY};
      font-weight: bold;
    }

    p {
      margin: 0;
      line-height: 1em
    }
  `,
};

class FuzzyTimeMonthUnit extends React.Component<FuzzyTimeSelectUnitProps, {}> {

  shouldComponentUpdate(nextProps: FuzzyTimeSelectUnitProps, nextState: {}) {
    return shouldUnitComponentUpdate(this.props, this.state, nextProps, nextState);
  }

  render() {
    const month = this.props.time;
    const {style} = this.props;

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

    return <div css={styles.root} style={style}>
      <FuzzyTimeSelectUnit
        {...this.props}
        time={month}
        css={styles.monthTitle}
        key="title">
        {month.getTime().toLocaleString('en-us', {month: 'long', timeZone: 'UTC'})}
      </FuzzyTimeSelectUnit>
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
