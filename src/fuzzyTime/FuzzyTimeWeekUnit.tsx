import {css} from '@emotion/react';
import * as Color from 'color';
import {times} from 'lodash';
import * as React from 'react';

import {FuzzyGranularity, FuzzyTime} from 'listlab-api';

import UIIconButton from 'ququmber-ui/button/UIIconButton';
import Colors from 'ququmber-ui/Colors';
import FuzzyTimeSelectUnit, {
  FuzzyTimeSelectUnitProps,
  shouldUnitComponentUpdate
} from 'ququmber-ui/fuzzyTime/FuzzyTimeSelectUnit';
import {daysInMonth} from 'ququmber-ui/utils/dateUtils';

const hoverRangeArrowSize = '13px';

const styles = {
  root: css`
    overflow: auto;
  `,
  dayish: css`
    height: 32px;
    border: 1px ${Colors.WHITE} solid;
    border-right: 0;
    border-bottom: 0;
    padding-top: 0;
    box-sizing: border-box;
    float: left;
    text-transform: uppercase;
    overflow: hidden;
    text-align: center;
    font-size: 13px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &:hover:not(.placeholder),
    &.hover {
      background-color: ${Colors.OPTION_HOVER};
    }

    &.selected {
      background-color: ${Colors.NOTIFY};
      color: ${Colors.WHITE};

      &.hover,
      &:hover {
        background-color: ${Color(Colors.NOTIFY).lighten(.2).hex()};
      }
    }
  `,
  hoverRangeStart: css`
    background: ${Colors.NOTIFY};
    border: transparent solid ${hoverRangeArrowSize};
    border-right: ${Colors.NOTIFY} solid ${hoverRangeArrowSize};
    transform: rotate(45deg);
    position: absolute;
    top: -${hoverRangeArrowSize};
    left: -${hoverRangeArrowSize};
  `,
  hoverRangeEnd: css`
    background: ${Colors.NOTIFY};
    border: transparent solid ${hoverRangeArrowSize};
    border-left: ${Colors.NOTIFY} solid ${hoverRangeArrowSize};
    transform: rotate(45deg);
    position: absolute;
    right: -${hoverRangeArrowSize};
    bottom: -${hoverRangeArrowSize};
  `,
  fullWeekButton: css`
    width: 9%;
    height: 32px;
    padding-top: 0;
    color: ${Colors.QUIET};
  `,
  day: css`
    width: 13%;
    font-size: 13px;

    p {
      top: 6px;
    }

    &:last-child {
      border-right: 0;
    }

    &.notChild {
      visibility: hidden;
    }

    &.now {
      color: ${Colors.NOTIFY};
      font-weight: bold;

      &.selected {
        color: ${Colors.WHITE};
      }
    }
  `
};


class FuzzyTimeWeekUnit extends React.Component<FuzzyTimeWeekUnitProps, {}> {

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

  shouldComponentUpdate(nextProps: FuzzyTimeWeekUnitProps, nextState: {}) {
    return shouldUnitComponentUpdate(this.props, this.state, nextProps, nextState);
  }

  render() {
    const week = this.props.time;
    const {month, hoverTime, selected} = this.props;
    let curDay: FuzzyTime;
    let placeholderDaysCount;
    let daysCount;
    const numDaysInMonth = daysInMonth(
      month.getTime().getUTCMonth(),
      month.getTime().getUTCFullYear()
    );
    const isFirstWeekInMonth = !week.withGranularity(FuzzyGranularity.MONTH).equals(month);

    if (isFirstWeekInMonth) {
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

    return <div css={styles.root}>
      <div
        css={[styles.dayish, styles.fullWeekButton]}
        className={
          ((hoverTime && hoverTime.equals(week)) ? 'hover ' : '') +
          ((selected && week.equals(selected)) ? 'selected ' : '')
        }
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}>
        <UIIconButton
          icon="qqico qqico-cal-week"
          tooltip="entire week"
        />
      </div>
      {times(placeholderDaysCount, (idx: number) =>
        <div
          css={[styles.dayish, styles.day]}
          className="placeholder"
          key={`${idx}-day-placeholder`}
        />
      )}
      {days.map(day =>
        <FuzzyTimeSelectUnit
          {...this.props}
          css={[styles.dayish, styles.day]}
          cssHoverRangeStart={styles.hoverRangeStart}
          cssHoverRangeEnd={styles.hoverRangeEnd}
          time={day}
          key={day.getTime().toString()}
          granularity={FuzzyGranularity.DAY}
        />
      )}
    </div>;
  }
}

export type FuzzyTimeWeekUnitProps = FuzzyTimeSelectUnitProps & {
  month: FuzzyTime;
};

export default FuzzyTimeWeekUnit;
