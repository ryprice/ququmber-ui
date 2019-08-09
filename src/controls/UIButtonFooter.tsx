import * as React from 'react';

import UIButton from 'ququmber-ui/button/UIButton';
import UIModal from 'ququmber-ui/popup/UIModal';
import UIOverlay from 'ququmber-ui/popup/UIOverlay';

export class UIButtonFooter extends React.Component<UIButtonFooterProps, {}> {
  render() {
    return <div className="UIButtonFooter">
      {this.props.children}
    </div>;
  }
}

export interface UIButtonFooterProps extends React.Props<UIButtonFooter> {
  children: React.ReactNode;
}

export default UIButtonFooter;
