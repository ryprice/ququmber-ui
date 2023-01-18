import {css} from '@emotion/react';
import * as React from 'react';

import Colors from 'ququmber-ui/Colors';
import UIDropdown from 'ququmber-ui/popup/UIDropdown';

const {useCallback} = React;

const styles = {
  root: css`
    display: flex;
    flex-direction: column;
  `,
  option: css`
    padding: 10px;
    padding-right: 50px;
    margin: 4px 2px;
    background: transparent;
    text-align: left;

    &:hover {
      background: ${Colors.OPTION_HOVER};
    }

    &:active {
      background: ${Colors.OPTION_SELECTED};
    }
  `,
  break: css`
    border-bottom: 1px solid ${Colors.SILENT};
  `
};

const UIContextMenu = (props: UIContextMenuProps) => {
  const {options, className, open, onClose} = props;

  const onClickOptionAndClose = useCallback((index: number) => {
    onClose();
    const option = options[index];
    if (option !== MENU_BREAK) {
      option.onClick && option.onClick();
    }
  }, [options, onClose]);

  return <UIDropdown
    open={open}
    onClose={onClose}
    css={styles.root}
    className={className}>
    {options.map((option, index: number) => {
      if (option === MENU_BREAK) {
        return <div key={index} css={styles.break} />;
      }
      return <button key={index} css={styles.option} onClick={() => onClickOptionAndClose(index)}>
        <i className={option.icon} />
        &nbsp;&nbsp;
        {option.name}
      </button>;
    })}
  </UIDropdown>;
};

export type UIContextMenuOption = {
  name: string;
  icon: string;
  onClick: () => void;
};

export const MENU_BREAK = 'MENU_BREAK';

export type UIContextMenuProps = {
  options: Array<UIContextMenuOption | typeof MENU_BREAK>;
  onClose: () => void;
  open: boolean;
  className?: string;
};


export default class UIContextMenuClass extends React.Component<UIContextMenuProps> {
  render() {
    return <UIContextMenu {...this.props} />;
  }
}
