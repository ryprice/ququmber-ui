import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TetherComponent from 'react-tether';

import UIDropdown from 'ququmber-ui/popup/UIDropdown';
import useOnOutsideClick from 'ququmber-ui/utils/useOnOutsideClick';

const {useRef} = React;

const UIPopup = (props: UIPopupProps) => {
  const {open, children, onClose, className, targetAttachment, attachment} = props;
  const contentRef = useRef();
  useOnOutsideClick([contentRef], onClose);
  return open
  ? <TetherComponent
      attachment={attachment}
      targetAttachment={targetAttachment}
      className="tether-theme-arrows">
      {children[0]}
      <div
        ref={contentRef}
        className={`${className} tether-content`}>
        {children[1]}
      </div>
    </TetherComponent>
  : children[0];
};

interface UIPopupProps {
  open: boolean;
  children: JSX.Element[];
  onClose: () => void;
  className?: string;
  targetAttachment?: string;
  attachment?: string;
  closeOnOutsideClick: boolean;
}

UIPopup.defaultProps = {
  attachment: 'top right',
  targetAttachment: 'bottom right',
  closeOnOutsideClick: true
};

export default UIPopup;
