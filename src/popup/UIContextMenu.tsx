import * as React from 'react';

import UIDropdown from 'ququmber-ui/popup/UIDropdown';

const {useCallback} = React;

const UIContextMenu = (props: UIContextMenuProps) => {
  const {options, className, open, onClose} = props;

  const onClickOptionAndClose = useCallback((index: number) => {
    onClose();
    const option = options[index];
    option.onClick && option.onClick();
  }, [options, onClose]);

  return <UIDropdown
    open={open}
    onClose={onClose}
    className={`UIContextMenu ${className || ''}`}>
    {options.map((option: UIContextMenuOption, index: number) => (
      <button key={index} className="option" onClick={() => onClickOptionAndClose(index)}>
        <i className={option.icon} />
        &nbsp;&nbsp;
        {option.name}
      </button>
    ))}
  </UIDropdown>;
};

export interface UIContextMenuOption {
  name: string;
  icon: string;
  onClick: () => void;
}

export interface UIContextMenuProps {
  options: UIContextMenuOption[];
  onClose: () => void;
  open: boolean;
  className?: string;
}

export default UIContextMenu;
