import * as React from "react";

import {FuzzyGranularity} from "ququmber-api";

import FuzzyTimeSelectUnit, {FuzzyTimeSelectUnitProps} from "ququmber-ui/fuzzyTime/FuzzyTimeSelectUnit";

const FuzzyTimeYearUnit = (props: FuzzyTimeSelectUnitProps) => {
  const year = props.time;
  const {onClick, style} = props;
  const elmts: JSX.Element[] = [];

  elmts.push();

  let curMonth = year.withGranularity(FuzzyGranularity.MONTH);
  let monthsCount = 0;
  while (monthsCount < 12) {
    elmts.push(<FuzzyTimeSelectUnit
      {...props}
      style={{}}
      time={curMonth}
      key={curMonth.getTime().toString()}
      granularity={FuzzyGranularity.MONTH}
    />);
    curMonth = curMonth.getNext();
    monthsCount++;
  }

  return <div style={style} className="FuzzyTimeYearUnit">
    <div className="yearTitle" onClick={() => onClick(year)} key="title">
      {year.getTime().getUTCFullYear().toString()}
    </div>
    <div style={{marginLeft: '30px', marginTop: '20px'}}>{elmts}</div>
  </div>;
};

export default FuzzyTimeYearUnit;
