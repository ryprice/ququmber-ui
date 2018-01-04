import * as React from "react";

import {FuzzyGranularity} from "ququmber-api";

import FuzzyTimeSelectUnit, {FuzzyTimeSelectUnitProps} from "ququmber-ui/fuzzyTime/FuzzyTimeSelectUnit";

const FuzzyTimeYearUnit = (props: FuzzyTimeSelectUnitProps) => {
  const year = props.time;
  const {onClick, style} = props;
  const elmts: JSX.Element[] = [<div style={{clear: 'both'}} key="clear" />];

  elmts.push(<div className="yearTitle" onClick={() => onClick(year)} key="title">
    {year.getTime().getUTCFullYear().toString()}
  </div>);

  let curMonth = year.withGranularity(FuzzyGranularity.MONTH);
  let monthsCount = 0;
  while (monthsCount < 12) {
    elmts.push(<FuzzyTimeSelectUnit
      {...props}
      style={{}}
      time={curMonth}
      key={curMonth.getTime().toString()}
    />);
    curMonth = curMonth.getNext();
    monthsCount++;
  }

  return <div style={style}>{elmts}</div>;
};

export default FuzzyTimeYearUnit;
