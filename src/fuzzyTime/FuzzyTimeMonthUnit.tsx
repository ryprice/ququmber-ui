import * as React from "react";

import {FuzzyGranularity} from "ququmber-api";

import {FuzzyTimeSelectUnitProps} from "ququmber-ui/fuzzyTime/FuzzyTimeSelectUnit";
import FuzzyTimeWeekUnit from "ququmber-ui/fuzzyTime/FuzzyTimeWeekUnit";
import {weeksInMonth} from "ququmber-ui/utils/dateUtils";

const FuzzyTimeMonthUnit = (props: FuzzyTimeSelectUnitProps) => {
  const month = props.time;
  const {style, onClick} = props;
  const elmts: JSX.Element[] = [<div style={{clear: 'both'}} key="clear" />];

  elmts.push(<div
    className="monthTitle"
    onClick={() => onClick(month)}
    key="title">
    {month.getTime().toLocaleString("en-us", {month: "long", timeZone: "UTC"})}
  </div>);

  const numWeeksInMonth = weeksInMonth(
    month.getTime().getUTCMonth(),
    month.getTime().getUTCFullYear()
  );
  let curWeek = month.withGranularity(FuzzyGranularity.WEEK);
  let weeksCount = 0;
  while (weeksCount < numWeeksInMonth) {
    elmts.push(<FuzzyTimeWeekUnit
      {...props}
      style={{}}
      time={curWeek}
      month={month}
      key={curWeek.getTime().toString()}
      granularity={FuzzyGranularity.MONTH}
    />);
    curWeek = curWeek.getNext();
    weeksCount++;
  }

  return <div className="monthContainer" style={style}>{elmts}</div>;
};

export default FuzzyTimeMonthUnit;
