import * as React from 'react';

import UIButton from 'ququmber-ui/button/UIButton';
import UITooltip from 'ququmber-ui/popup/UITooltip';

class UITooltipSample extends React.Component<{}, UITooltipSampleState> {

  readonly state: UITooltipSampleState = {
    showTooltip: false
  };

  render() {
    return <UITooltip
      text="Click here for a surprise!"
      open={this.state.showTooltip}
      targetAttachment="bottom center">
      <UIButton
        onClick={() => this.setState({showTooltip: !this.state.showTooltip})}>
        Show tooltip
      </UIButton>
    </UITooltip>;
  }
}

interface UITooltipSampleState {
  showTooltip: boolean;
}

export default UITooltipSample;
