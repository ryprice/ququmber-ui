import * as React from 'react';
import TetherComponent from 'react-tether';

import UIButton from 'ququmber-ui/button/UIButton';
import UIDropdown from 'ququmber-ui/popup/UIDropdown';
import Stylings from 'ququmber-ui/Stylings';

const {useCallback, useState} = React;

const UIDropdownButton = (props: UIDropdownButtonProps) => {
  const {name, options, styling, style} = props;
  const [open, setOpen] = useState(false);

  const onClickOptionAndClose = useCallback((index: number) => {
    setOpen(false);
    const option = options[index];
    option.onClick && option.onClick();
  }, [options]);

  const onClose = useCallback(() => setOpen(false), []);

  return <TetherComponent
    attachment="top right"
    targetAttachment="bottom right">
    <UIButton
      styling={styling}
      onClick={() => setOpen(true)}>
      <span style={style}>
        {name}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <i className="fa fa-caret-down" style={{float: 'right'}}/>
      </span>
    </UIButton>
    <UIDropdown
      open={open}
      onClose={onClose}
      className="UIDropdownButtonDropdown">
      {options.map((option: UIDropdownButtonOption, index: number) => (
        <button className="option" onClick={() => onClickOptionAndClose(index)}>
          <i className={option.icon} />
          &nbsp;&nbsp;
          {option.name}
        </button>
      ))}
    </UIDropdown>
  </TetherComponent>;
};

interface UIDropdownButtonOption {
  name: string;
  icon: string;
  onClick: () => void;
}

interface UIDropdownButtonProps {
  options: UIDropdownButtonOption[];
  styling?: Stylings;
  name: React.ReactNode;
  style?: object;
}

export default UIDropdownButton;
