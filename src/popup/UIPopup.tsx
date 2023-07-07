import {MutableRefObject, useRef} from 'react';
import {mergeRefs} from 'react-merge-refs';
import TetherComponent from 'react-tether';

import useOnOutsideClick from 'ququmber-ui/utils/useOnOutsideClick';

export const PADDING_POPUP = '10';

const UIPopup = (props: UIPopupProps) => {
  const {open, children, onClose, className, targetAttachment, attachment} = props;
  const contentRef = useRef();
  useOnOutsideClick([contentRef], onClose, open);
  return open
    ? <TetherComponent
      attachment={attachment}
      targetAttachment={targetAttachment}
      className="tether-theme-arrows"
      renderTarget={(tetherRef: MutableRefObject<HTMLDivElement>) => (
        <div ref={tetherRef}>{children[0]}</div>
      )}
      renderElement={(tetherRef: MutableRefObject<HTMLDivElement>) => <div
        ref={mergeRefs([contentRef, tetherRef])}
        className={`${className} tether-content`}>
        {children[1]}
      </div>}
    />
    : children[0];
};

type UIPopupProps = {
  open: boolean;
  children: JSX.Element[];
  onClose: () => void;
  className?: string;
  targetAttachment?: string;
  attachment?: string;
  closeOnOutsideClick: boolean;
};

UIPopup.defaultProps = {
  attachment: 'top right',
  targetAttachment: 'bottom right',
  closeOnOutsideClick: true
};

export default UIPopup;
