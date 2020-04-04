import * as React from 'react';
import TetherComponent from 'react-tether';

import UIButton from 'ququmber-ui/button/UIButton';
import UIContextMenu, {UIContextMenuOption} from 'ququmber-ui/popup/UIContextMenu';
import Stylings from 'ququmber-ui/Stylings';

const {useCallback, useState} = React;

const UIDropdownButton = (props: UIDropdownButtonProps) => {
  const {name, options, styling, style, className} = props;
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => setOpen(false), []);

  return <TetherComponent
    attachment="top right"
    targetAttachment="bottom right">
    <UIButton
      className={`${className} UIDropdownButton`}
      styling={styling}
      onClick={() => setOpen(true)}>
      <span style={style}>
        {name}
        <i className="dropdownArrow fa fa-caret-down" style={{float: 'right'}} />
      </span>
    </UIButton>
    <UIContextMenu open={open} options={options} onClose={onClose} />
  </TetherComponent>;
};

type UIDropdownButtonOption = UIContextMenuOption;

type UIDropdownButtonProps = {
  options: UIDropdownButtonOption[];
  styling?: Stylings;
  name: React.ReactNode;
  style?: object;
  className?: string;
};

export default UIDropdownButton;
