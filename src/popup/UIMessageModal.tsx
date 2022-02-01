import * as React from 'react';

import UIButton from 'ququmber-ui/button/UIButton';
import UIButtonFooter from 'ququmber-ui/button/UIButtonFooter';
import UIModal from 'ququmber-ui/popup/UIModal';
import UIOverlay from 'ququmber-ui/popup/UIOverlay';
import Stylings from 'ququmber-ui/Stylings';

export const Level = {
  Info: 0,
  Warning: 1,
  Error: 2
};

const UIMessageModal = (props: UIMessageModalProps) => {
  const {
    title, message, onConfirm, onCancel, confirmText,
    className,confirmStyling, open, debugInline
  } = props;

  return <UIOverlay open={open} debugInline={debugInline}>
    <UIModal className={className} open={open}>
      <div className="UIMessageModal">
        <p className="title">{title}</p>
        <p className="message">{message}</p>
        <UIButtonFooter>
          <UIButton onClick={onConfirm} styling={confirmStyling || Stylings.GO}>
            {confirmText ?? 'Confirm'}
          </UIButton>
          <UIButton onClick={onCancel}>Cancel</UIButton>
        </UIButtonFooter>
      </div>
    </UIModal>
  </UIOverlay>;
};

export type UIMessageModalProps = {
  level?: number;
  title: string;
  message: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  className?: string;
  confirmStyling?: Stylings;
  open?: boolean;
  debugInline?: boolean;
  confirmText?: string;
};

export default UIMessageModal;
