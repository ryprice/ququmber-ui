import {MutableRefObject, Component} from 'react';

import UIButton from 'ququmber-ui/button/UIButton';
import UIPopup from 'ququmber-ui/popup/UIPopup';

class UIPopupSample extends Component<{}, UIPopupSampleState> {

  readonly state: UIPopupSampleState = {
    showPopup: false
  };

  render() {
    return <UIPopup
      open={this.state.showPopup}
      targetAttachment="bottom center"
      onClose={() => this.setState({showPopup: false})}
      closeOnOutsideClick={true}
      renderTarget={(targetRef: MutableRefObject<HTMLButtonElement>) => (
        <UIButton
          ref={targetRef}
          onClick={() => this.setState({showPopup: !this.state.showPopup})}>
          Show popup
        </UIButton>
      )}
      contentNode={<div style={{width: '300px', height: '500px'}} />}
    />;
  }
}

type UIPopupSampleState = {
  showPopup: boolean;
};

export default UIPopupSample;
