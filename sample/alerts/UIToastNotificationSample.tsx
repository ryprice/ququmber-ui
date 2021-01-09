import * as React from 'react';

import UIToastNotification, {Levels} from 'ququmber-ui/alerts/UIToastNotification';
import UIToastNotificationArea from 'ququmber-ui/alerts/UIToastNotificationArea';
import UIButton from 'ququmber-ui/button/UIButton';

class UIToastNotificationSample extends React.Component<{}, UIToastNotificationSampleState> {

  readonly state: UIToastNotificationSampleState = {
    showError: false,
    showWarning: false,
    showInfo: false,
    showSuccess: false
  };

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
          key="1"
          level={Levels.SUCCESS}
          title="Success"
          message="A success has occured. Congrats to you!"
        />}
        {showInfo && <UIToastNotification
          key="2"
          level={Levels.INFO}
          title="Info"
          message="An info has occured."
        />}
        {showWarning && <UIToastNotification
          key="3"
          level={Levels.WARNING}
          title="Warning"
          message="A warning has occured."
        />}
        {showError && <UIToastNotification
          key="4"
          level={Levels.ERROR}
          title="Error"
          message="An error has occured."
        />}
      </UIToastNotificationArea>
    </div>;
  }
}

type UIToastNotificationSampleState = {
  showError: boolean;
  showWarning: boolean;
  showInfo: boolean;
  showSuccess: boolean;
};

export default UIToastNotificationSample;
