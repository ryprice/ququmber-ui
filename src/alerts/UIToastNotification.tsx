import * as React from 'react';

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
};

const UIToastNotification = (props: UIToastNotificationProps) => {
  const {level, title, message} = props;

  return <div
    className="UIToastNotification"
    style={{borderTopColor: levelToColor(level)}}
  >
    { title ? <p className="title">{String(title)}</p> : null }
    { message ? <p className="message">{String(message)}</p> : null }
  </div>;
};

export type UIToastNotificationProps = {
  level: string;
  title?: string;
  message?: string;
  key?: string;
};

export default UIToastNotification;
