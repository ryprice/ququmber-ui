import * as React from 'react';

import UIButton from 'ququmber-ui/button/UIButton';
import UIButtonFooter from 'ququmber-ui/controls/UIButtonFooter';
import UIModal from 'ququmber-ui/popup/UIModal';
import UIOverlay from 'ququmber-ui/popup/UIOverlay';
import Stylings from 'ququmber-ui/Stylings';

export const Level = {
  Info: 0,
  Warning: 1,
  Error: 2
};

export class UIMessageModal extends React.Component<UIMessageModalProps, {}> {
  render() {
    const {title, message, onConfirm, onCancel, className, confirmStyling} = this.props;

    return <UIOverlay>
      <UIModal className={className}>
        <div className="UIMessageModal">
          <p className="title">{title}</p>
          <p className="message">{message}</p>
          <UIButtonFooter>
            <UIButton onClick={onConfirm} styling={confirmStyling || Stylings.GO}>Confirm</UIButton>
            <UIButton onClick={onCancel}>Cancel</UIButton>
          </UIButtonFooter>
        </div>
      </UIModal>
    </UIOverlay>;
  }
}

export interface UIMessageModalProps extends React.Props<UIMessageModal> {
  level?: number;
  title: string;
  message: JSX.Element | JSX.Element[] | string;
  onCancel: () => void;
  onConfirm: () => void;
  className?: string;
  confirmStyling?: Stylings;
}

export default UIMessageModal;
