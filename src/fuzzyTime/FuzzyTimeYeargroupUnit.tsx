import * as React from "react";

import FuzzyTimeSelectUnit, {FuzzyTimeSelectUnitProps} from "ququmber-ui/fuzzyTime/FuzzyTimeSelectUnit";

export const FuzzyTimeYeargroupUnit = (props: FuzzyTimeSelectUnitProps) => {
  const elmts: JSX.Element[] = [<div style={{clear: 'both'}} />];
  const {style} = props;
  let curYear = props.time;
  let yearsCount = 0;
  while (yearsCount < 4) {
    elmts.push(<FuzzyTimeSelectUnit
      {...props}
      time={curYear}
      style={{}}
      key={curYear.getTime().toString()}
    />);
    curYear = curYear.getNext();
    yearsCount++;
  }

  return <div style={style}>{elmts}</div>;
};

export default FuzzyTimeYeargroupUnit;
