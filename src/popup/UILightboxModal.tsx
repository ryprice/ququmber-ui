import * as React from 'react';

import UIModal, {UIModalProps} from 'ququmber-ui/popup/UIModal';
import UIOverlay from 'ququmber-ui/popup/UIOverlay';

const UILightboxModal = (props: UIModalProps) => {

  return <UIOverlay open={props.open} onOverlayClick={props.onClose}>
    <UIModal
      style={{background: 'transparent', boxShadow: 'none'}}
      {...props}
    />;
  </UIOverlay>
};

export default UILightboxModal;
