import {map, pick} from 'lodash';
import * as React from 'react';

import UIButton from 'ququmber-ui/button/UIButton';
import UIToastNotification, {Levels} from 'ququmber-ui/controls/UIToastNotification';
import UIToastNotificationArea from 'ququmber-ui/controls/uiToastNotificationArea';

class UIToastNotificationSample extends React.Component<{}, UIToastNotificationSampleState> {

  readonly state: UIToastNotificationSampleState = {
    showError: false,
    showWarning: false,
    showInfo: false,
    showSuccess: false
  }
  render() {
    const {showSuccess, showInfo, showWarning, showError} = this.state;
    return <div className="UIToastNotificationSample">
      <UIButton onClick={() => this.setState({showSuccess: true})}>Show success</UIButton>
      <br />
      <UIButton onClick={() => this.setState({showInfo: true})}>Show info</UIButton>
      <br />
      <UIButton onClick={() => this.setState({showWarning: true})}>Show warning</UIButton>
      <br />
      <UIButton onClick={() => this.setState({showError: true})}>Show error</UIButton>
      <UIToastNotificationArea>
        {showSuccess && <UIToastNotification
          level={Levels.SUCCESS}
          title="Success"
          message="A success has occured. Congrats to you!"
        />}
        {showInfo && <UIToastNotification
          level={Levels.INFO}
          title="Info"
          message="An info has occured."
        />}
        {showWarning && <UIToastNotification
          level={Levels.WARNING}
          title="Warning"
          message="A warning has occured."
        />}
        {showError && <UIToastNotification
          level={Levels.ERROR}
          title="Error"
          message="An error has occured."
        />}
      </UIToastNotificationArea>
    </div>;
  }
}

interface UIToastNotificationSampleState {
  showError: boolean,
  showWarning: boolean,
  showInfo: boolean,
  showSuccess: boolean
}

export default UIToastNotificationSample;
