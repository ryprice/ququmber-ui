import {css} from '@emotion/react';
import * as React from 'react';

import UIIconButton from 'ququmber-ui/button/UIIconButton';
import Colors from 'ququmber-ui/Colors';


const styles = {
  inner: css`
    display: flex;
    flex-direction: row;
    max-width: 700px;
    margin: 0 auto;
    opacity: .9;
  `,

  children: css`
    flex-grow: 1;
    margin: .4em 20px .4em 0;
  `,

  closeButton: css`
    flex-grow: 0;
    flex-shrink: 0;
    margin-top: .2em;
  `
};

const UIBanner = (props: UIBannerProps) => {
  const {onClose, children, background} = props;
  return (
    <div style={{background: background || Colors.LIGHTBLUE}}>
      <div css={styles.inner}>
        <div css={styles.children}>{children}</div>
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
};

export default UIBanner;
