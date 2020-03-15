import {times} from 'lodash';
import * as React from 'react';

import {FuzzyGranularity} from 'listlab-api';

import FuzzyTimeSelectUnit, {
  FuzzyTimeSelectUnitProps,
  shouldUnitComponentUpdate
} from 'ququmber-ui/fuzzyTime/FuzzyTimeSelectUnit';

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

    return <div style={style} className="FuzzyTimeYearUnit">
      <FuzzyTimeSelectUnit
        {...props}
        className="yearTitle"
        key="title">
        {year.getTime().getUTCFullYear().toString()}
      </FuzzyTimeSelectUnit>
      <div style={{marginLeft: '47px', marginTop: '20px'}}>
        {months.map(month =>
          <FuzzyTimeSelectUnit
            {...props}
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
