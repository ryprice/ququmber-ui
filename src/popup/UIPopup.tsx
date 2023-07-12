import {MutableRefObject, useRef} from 'react';
import {mergeRefs} from 'react-merge-refs';
import TetherComponent from 'react-tether';

import useOnOutsideClick from 'ququmber-ui/utils/useOnOutsideClick';

export const PADDING_POPUP = '10';

const UIPopup = (props: UIPopupProps) => {
  const {open, renderTarget, contentNode, onClose, className, targetAttachment, attachment} = props;
  const contentRef = useRef();
  useOnOutsideClick([contentRef], onClose, open);
  return open
    ? <TetherComponent
      attachment={attachment}
      targetAttachment={targetAttachment}
      className="tether-theme-arrows"
      renderTarget={(tetherRef: MutableRefObject<Element>) => (
        renderTarget(tetherRef)
      )}
      renderElement={(tetherRef: MutableRefObject<HTMLDivElement>) => <div
        ref={mergeRefs([contentRef, tetherRef])}
        className={`${className} tether-content`}>
        {contentNode}
      </div>}
    />
    : renderTarget(null);
};

type UIPopupProps = {
  open: boolean;
  onClose: () => void;
  className?: string;
  targetAttachment?: string;
  attachment?: string;
  closeOnOutsideClick: boolean;
  renderTarget: (tetherRef: MutableRefObject<Element>) => JSX.Element;
  contentNode: JSX.Element;
};

UIPopup.defaultProps = {
  attachment: 'top right',
  targetAttachment: 'bottom right',
  closeOnOutsideClick: true
};

export default UIPopup;
