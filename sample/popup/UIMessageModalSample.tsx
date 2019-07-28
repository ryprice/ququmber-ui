import {map, pick} from 'lodash';
import * as React from 'react';

import UIButton from 'ququmber-ui/button/UIButton';
import UIMessageModal from 'ququmber-ui/popup/UIMessageModal';

class UIMessageModalSample extends React.Component<{}, UIMessageModalSampleState> {

  readonly state: UIMessageModalSampleState = {
    open: false
  };

  render() {
    return <div className="UIMessageModalSample">
      <UIButton
        onClick={() => this.setState({open: true})}>
        Open modal
      </UIButton>
      <UIMessageModal
        open={this.state.open}
        title="There was a problem"
        message={
          'It looks like the service had a hiccup processesing your request. ' +
          'Try refreshing the page and starting over. ' +
          'If you\'re still seeing this issue contact support.'
        }
        onCancel={() => this.setState({open: false})}
        onConfirm={() => this.setState({open: false})}
      />
    </div>;
  }
}

interface UIMessageModalSampleState {
  open: boolean;
}

export default UIMessageModalSample;
