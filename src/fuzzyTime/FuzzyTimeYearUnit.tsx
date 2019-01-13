import {times} from 'lodash';
import * as React from 'react';

import {FuzzyGranularity} from 'ququmber-api';

import FuzzyTimeSelectUnit, {
  FuzzyTimeSelectUnitProps,
  shouldUnitComponentUpdate
} from 'ququmber-ui/fuzzyTime/FuzzyTimeSelectUnit';

class FuzzyTimeYearUnit extends React.Component<FuzzyTimeSelectUnitProps, {}> {
  onClick = () => {
    const {time, onClick} = this.props;
    onClick(time);
  }

  shouldComponentUpdate(nextProps: FuzzyTimeSelectUnitProps, nextState: {}) {
    return shouldUnitComponentUpdate(this.props, this.state, nextProps, nextState);
  }

  render() {
    const year = this.props.time;
    const {style} = this.props;

    let curMonth = year.withGranularity(FuzzyGranularity.MONTH);
    const monthsCount = 12;
    const months = times(monthsCount, () => {
      const prevMonth = curMonth;
      curMonth = curMonth.getNext();
      return prevMonth;
    });

    return <div style={style} className="FuzzyTimeYearUnit">
      <div
        className="yearTitle"
        onClick={this.onClick}
        key="title">
        {year.getTime().getUTCFullYear().toString()}
      </div>
      <div style={{marginLeft: '30px', marginTop: '20px'}}>
        {months.map(month =>
          <FuzzyTimeSelectUnit
            {...this.props}
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
