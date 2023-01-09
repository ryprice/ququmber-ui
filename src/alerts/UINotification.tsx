import {css} from '@emotion/react';

import Colors from 'ququmber-ui/Colors';

const styles = {
  root: css`
    padding: .8rem;
    border-radius: 2px;
    font-weight: 300;
    overflow: auto;
    position: relative;
    border-top-style: solid;
    flex-grow: 1;
  `,

  title: css`
    font-weight: bold;
  `,

  message: css`
    font-size: .8em;
  `,

  close: css`
    right: 5px;
    top: 5px;
    position: absolute;
    cursor: pointer;
    font-size: 20px;
  `
};

export const Levels = {
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  INFO: 'INFO',
  SUCCESS: 'SUCCESS'
};

const levelToColor = (level: string) => {
  switch (level) {
    case Levels.ERROR: return '#ff7777';
    case Levels.WARNING: return '#ffdf82';
    case Levels.INFO: return '#b8d0ef';
    case Levels.SUCCESS: return '#90dda1';
  }
};

const UINotification = (props: UINotificationProps) => {
  const {level, title, message, hideBorder} = props;

  return <div
    css={styles.root}
    style={{
      ...(hideBorder === true ? {} : {border: `1px solid ${Colors.CONTROL_FLAT}`}),
      borderTopWidth: '3px',
      borderTopColor: levelToColor(level)
    }}
  >
    { title ? <p css={styles.title}>{String(title)}</p> : null }
    { message ? <p css={styles.message}>{message}</p> : null }
  </div>;
};

export type UINotificationProps = {
  level: string;
  title?: string;
  message?: string | React.ReactElement;
  hideBorder?: boolean;
};

export default UINotification;
