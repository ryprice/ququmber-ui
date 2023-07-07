import {MutableRefObject, useCallback, useState} from 'react';
import TetherComponent from 'react-tether';

import UIButton from 'ququmber-ui/button/UIButton';
import UIContextMenu, {UIContextMenuOption} from 'ququmber-ui/popup/UIContextMenu';
import Stylings from 'ququmber-ui/Stylings';

const UIDropdownButton = (props: UIDropdownButtonProps) => {
  const {name, options, styling, style, className} = props;
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => setOpen(false), []);

  const renderButton = (tetherRef: MutableRefObject<HTMLButtonElement>) => (
    <UIButton
      ref={tetherRef}
      className={`${className} UIDropdownButton`}
      styling={styling}
      onClick={() => setOpen(true)}>
      <span style={style}>
        {name}
        <i className="fa fa-caret-down" style={{float: 'right', paddingLeft: '.4em'}} />
      </span>
    </UIButton>
  );

  const renderDropdown = (tetherRef: MutableRefObject<UIContextMenu>) => (
    <UIContextMenu
      open={open}
      options={options}
      onClose={onClose}
      ref={tetherRef}
    />
  );

  return <TetherComponent
    attachment="top right"
    targetAttachment="bottom right"
    renderTarget={renderButton}
    renderElement={renderDropdown}
  />;
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
