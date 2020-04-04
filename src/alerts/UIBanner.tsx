import * as React from 'react';

import UIIconButton from 'ququmber-ui/button/UIIconButton';
import Colors from 'ququmber-ui/Colors';

const UIBanner = (props: UIBannerProps) => {
  const {onClose, children, background} = props;
  return (
    <div className="UIBanner" style={{background: background || Colors.LIGHTBLUE}}>
      <div className="inner">
        <div className="children">{children}</div>
        {onClose && (
          <div className="closeButton">
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
