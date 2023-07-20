import {css} from '@emotion/react';
import * as Color from 'color';
import {times} from 'lodash';
import * as React from 'react';

import {FuzzyGranularity} from 'listlab-api';

import Colors from 'ququmber-ui/Colors';
import FuzzyTimeSelectUnit, {
  FuzzyTimeSelectUnitProps,
  shouldUnitComponentUpdate
} from 'ququmber-ui/fuzzyTime/FuzzyTimeSelectUnit';

const styles = {
  title: css`
    transform: rotate(-90deg);
    position: absolute;
    font-size: 24px;
    bottom: 48px;
    font-weight: normal;
    cursor: pointer;

    &:hover:not(.placeholder)
    &.hover {
      font-weight: bold;
    }

    &.selected {
      color: ${Colors.NOTIFY};
      font-weight: bold;
    }
  `,
  month: css`
    height: 30px;
    clear: none;
    width: 25%;
    box-sizing: border-box;
    text-transform: uppercase;
    overflow: hidden;
    font-size: 13px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:hover:not(.placeholder),
    &.hover {
      background-color: ${Colors.OPTION_HOVER};
    }

    &.selected {
      background-color: ${Colors.NOTIFY};
      color: ${Colors.WHITE};

      &.hover {
        background-color: ${Color(Colors.NOTIFY).lighten(.2).hex()};
      }
    }
  `
};

class FuzzyTimeYearUnit extends React.Component<FuzzyTimeSelectUnitProps, {}> {

  shouldComponentUpdate(nextProps: FuzzyTimeSelectUnitProps, nextState: {}) {
    return shouldUnitComponentUpdate(this.props, this.state, nextProps, nextState);
  }

  render() {
    const {props} = this;
    const {style} = props;
    const year = props.time;

    let curMonth = year.withGranularity(FuzzyGranularity.MONTH);
    const monthsCount = 12;
    const months = times(monthsCount, () => {
      const prevMonth = curMonth;
      curMonth = curMonth.getNext();
      return prevMonth;
    });

    return <div style={style}>
      <FuzzyTimeSelectUnit
        {...props}
        css={styles.title}
        key="title">
        {year.getTime().getUTCFullYear().toString()}
      </FuzzyTimeSelectUnit>
      <div style={{marginLeft: '47px', marginTop: '20px'}}>
        {months.map(month =>
          <FuzzyTimeSelectUnit
            {...props}
            css={styles.month}
            time={month}
            key={month.getTime().toString()}
            granularity={FuzzyGranularity.MONTH}
          />
        )}
      </div>
    </div>;
  }
}

export default FuzzyTimeYearUnit;
