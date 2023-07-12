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
      targetAttachment="bottom center"
      renderTarget={(targetRef: React.MutableRefObject<HTMLButtonElement>) => (
        <UIButton
          ref={targetRef}
          onClick={() => this.setState({showTooltip: !this.state.showTooltip})}>
          Show tooltip
        </UIButton>
      )}
    />;
  }
}

type UITooltipSampleState = {
  showTooltip: boolean;
};

export default UITooltipSample;
