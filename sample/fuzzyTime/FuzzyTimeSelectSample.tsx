import {useState} from 'react';

import {FuzzyTime, FuzzyTimeRange} from 'listlab-api';

import FuzzyTimeSelect from 'ququmber-ui/fuzzyTime/FuzzyTimeSelect';

const FuzzyTimeSelectSample = () => {
  const [time1, setTime1] = useState<FuzzyTime>();
  const [range1, setRange1] = useState<FuzzyTimeRange>();

  return (
    <div>
      <p>Time selection</p>
      <div style={{
        width: '300px',
        height: '500px',
        background: '#ffffff'
      }}>
        <FuzzyTimeSelect
          selected={time1}
          onTimeSelected={setTime1}
        />
      </div>
      <p>Range selection</p>
      <div style={{
        width: '300px',
        height: '500px',
        background: '#ffffff'
      }}>
        <FuzzyTimeSelect
          selectedRange={range1}
          onRangeSelected={setRange1}
          multiselect={true}
        />
      </div>
    </div>
  );
};

export default FuzzyTimeSelectSample;
