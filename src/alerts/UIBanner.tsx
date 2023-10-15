import {css} from '@emotion/react';
import UIButton from 'ququmber-ui/button/UIButton';

import UIIconButton from 'ququmber-ui/button/UIIconButton';
import Colors from 'ququmber-ui/Colors';
import Stylings from 'ququmber-ui/Stylings';

const styles = {
  inner: css`
    display: flex;
    flex-direction: row;
    max-width: 700px;
    margin: 0 auto;
    opacity: .9;
    padding: 0 .3em;
  `,

  children: css`
    flex-grow: 1;
    margin: .6em 20px .6em 0;
  `,
  actionButton: css`
    flex-grow: 0;
    flex-shrink: 0;
    margin: 0 1em;
    font-size: .8em;
  `,
  closeButton: css`
    flex-grow: 0;
    flex-shrink: 0;
    margin-top: .2em;
  `
};

const UIBanner = (props: UIBannerProps) => {
  const {onClose, children, background, action} = props;
  return (
    <div style={{background: background || Colors.LIGHTBLUE}}>
      <div css={styles.inner}>
        <div css={styles.children}>{children}</div>
        {action && (
          <div css={styles.actionButton}>
            <UIButton onClick={action.onClick} styling={Stylings.OUTLINE}>
              {action.text}
            </UIButton>
          </div>
        )}
        {onClose && (
          <div css={styles.closeButton}>
            <UIIconButton icon="fa fa-times" onClick={onClose} />
          </div>
        )}
      </div>
    </div>
  );
};

type UIBannerProps = {
  children: React.ReactNode;
  onClose?: () => void;
  background?: string;
  action?: {
    text: string;
    onClick: () => void;
  }
};

export default UIBanner;
