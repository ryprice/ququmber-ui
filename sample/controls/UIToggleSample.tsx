import {map, pick} from 'lodash';
import * as React from 'react';

import UIToggle from 'ququmber-ui/controls/UIToggle';

class UIToggleSample extends React.Component<{}, UIToggleSampleState> {

  readonly state: UIToggleSampleState = {
    value: false
  };
  
  render() {
    const {value} = this.state;
    return <div className="UIToggleSample">
      <UIToggle
        checked={value}
        onChange={value => this.setState({value})}
      />
    </div>;
  }
}

interface UIToggleSampleState {
  value: boolean;
}

export default UIToggleSample;
