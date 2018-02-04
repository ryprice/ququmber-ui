import * as React from "react";

import {FuzzyGranularity, FuzzyTime} from "ququmber-api";

import FuzzyTimeSelectUnit, {FuzzyTimeSelectUnitProps} from "ququmber-ui/fuzzyTime/FuzzyTimeSelectUnit";
import {daysInMonth} from "ququmber-ui/utils/dateUtils";

export const FuzzyTimeWeekUnit = (props: FuzzyTimeWeekUnitProps) => {
  const week = props.time;
  const {month, onClick, focalPoint, hoverTime, onMouseOver} = props;
  let curDay;
  let numDaysToRender;
  const elmts: JSX.Element[] = [];
  const numDaysInMonth = daysInMonth(
    month.getTime().getUTCMonth(),
    month.getTime().getUTCFullYear()
  );

  elmts.push(<div
    className="FuzzyTimeSelectUnit fullWeekButton"
    onClick={() => onClick(week)}
    onMouseOver={() => onMouseOver(week)}
  />);

  if (!week.withGranularity(FuzzyGranularity.MONTH).equals(month)) {
    // Place spots before first of the month
    curDay = month.withGranularity(FuzzyGranularity.DAY);
    for (let i = 0; i < curDay.getTime().getUTCDay(); i++) {
      elmts.push(<div className="FuzzyTimeSelectUnit placeholder day" />);
    }
    numDaysToRender = 7 - curDay.getTime().getUTCDay();
  } else {
    curDay = week.withGranularity(FuzzyGranularity.DAY);
    numDaysToRender = Math.min(7, numDaysInMonth - curDay.getTime().getUTCDate() + 1);
  }

  let daysCount = 0;
  while (daysCount < numDaysToRender) {
    elmts.push(<FuzzyTimeSelectUnit
      {...props}
      style={{}}
      time={curDay}
      key={curDay.getTime().toString()}
      granularity={FuzzyGranularity.DAY}
    />);
    curDay = curDay.getNext();
    daysCount++;
  }
  return <div className={`weekContainer ${(hoverTime && hoverTime.compareTo(week) === 0) ? 'weekContainerHover' : ''}`}>
    {elmts}
  </div>;
};

export interface FuzzyTimeWeekUnitProps extends FuzzyTimeSelectUnitProps {
  month: FuzzyTime;
}

export default FuzzyTimeWeekUnit;
