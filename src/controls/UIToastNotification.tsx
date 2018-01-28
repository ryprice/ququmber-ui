import * as React from "react";

export const Levels = {
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  INFO: 'INFO',
  SUCCESS: 'SUCCESS'
};

const levelToColor = (level: string) => {
  switch(level) {
    case Levels.ERROR: return '#ff7777';
    case Levels.WARNING: return '#ffdf82';
    case Levels.INFO: return '#b8d0ef';
    case Levels.SUCCESS: return '#90dda1';
  }
}

export class UIToastNotification extends React.Component<UIToastNotificationProps, {}> {
  render() {
    const {level, title, message} = this.props;

    return <div
      className={`UIToastNotification`}
      style={{background: levelToColor(level)}}
    >
      { title ? <p className="title">{String(title)}</p> : null }
      { message ? <p className="message">{String(message)}</p> : null }
    </div>;
  }
}

export interface UIToastNotificationProps {
  level: string;
  title?: string;
  message?: string;
}

export default UIToastNotification;
