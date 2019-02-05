import * as React from 'react';

import {FuzzyTime} from 'ququmber-api';

import FuzzyTimeSelect from 'ququmber-ui/fuzzyTime/FuzzyTimeSelect';

class FuzzyTimeSelectSample extends React.Component<{}, FuzzyTimeSelectSampleState> {

  readonly state: FuzzyTimeSelectSampleState = {
    time1: null
  };

  render() {
    const {time1} = this.state;
    return (
      <div style={{
        width: '300px',
        height: '500px',
        background: '#ffffff'
      }}>
        <FuzzyTimeSelect
          selected={time1}
          onTimeSelected={(t) => this.setState({time1: t})}
          multiselect={false}
        />
      </div>
    );
  }
}

interface FuzzyTimeSelectSampleState {
  time1: FuzzyTime;
}

export default FuzzyTimeSelectSample;
