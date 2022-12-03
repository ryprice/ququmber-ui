import {css} from '@emotion/react';
import UINotification from 'ququmber-ui/alerts/UINotification';

import Colors from 'ququmber-ui/Colors';

const styles = {
  root: css`
    width: 20rem;
    z-index: 10;
    pointer-events: none;
    box-shadow: rgba(0, 0, 0, 0.16) 0 3px 6px, rgba(0, 0, 0, 0.23) 0 3px 6px;
    left: 0;
    margin-top: 10px;
    background: ${Colors.WHITE};
  `,
};

export const Levels = {
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  INFO: 'INFO',
  SUCCESS: 'SUCCESS'
};

const UIToastNotification = (props: UIToastNotificationProps) => {
  return <div css={styles.root}>
    <UINotification {...props} hideBorder={true} />
  </div>;
};

export type UIToastNotificationProps = {
  level: string;
  title?: string;
  message?: string;
};

export default UIToastNotification;
