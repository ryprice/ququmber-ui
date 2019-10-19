import * as React from 'react';

import UIButton from 'ququmber-ui/button/UIButton';
import UIPopup from 'ququmber-ui/popup/UIPopup';

class UIPopupSample extends React.Component<{}, UIPopupSampleState> {

  readonly state: UIPopupSampleState = {
    showPopup: false
  };

  render() {
    return <UIPopup
      open={this.state.showPopup}
      targetAttachment="bottom center"
      onClose={() => this.setState({showPopup: false})}
      closeOnOutsideClick={true}>
      <UIButton
        onClick={() => this.setState({showPopup: !this.state.showPopup})}>
        Show popup
      </UIButton>
      <div style={{width: '300px', height: '500px'}} />
    </UIPopup>;
  }
}

interface UIPopupSampleState {
  showPopup: boolean;
}

export default UIPopupSample;
