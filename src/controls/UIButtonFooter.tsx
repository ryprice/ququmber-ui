import * as React from 'react';

import UIButton from 'ququmber-ui/button/UIButton';
import UIModal from 'ququmber-ui/controls/UIModal';
import UIOverlay from 'ququmber-ui/controls/UIOverlay';

export class UIButtonFooter extends React.Component<UIButtonFooterProps, {}> {
  render() {
    return <div className="UIButtonFooter">
      {this.props.children}
    </div>;
  }
}

export interface UIButtonFooterProps extends React.Props<UIButtonFooter> {
  children: JSX.Element | JSX.Element[];
}

export default UIButtonFooter;
