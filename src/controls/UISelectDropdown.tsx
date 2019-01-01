import {map} from "lodash";
import * as React from "react";

import UIDropdown from "ququmber-ui/controls/UIDropdown";

export class UISelectDropdown extends React.Component<UISelectDropdownProps, {}> {
  public static defaultProps = {
    className: "",
    onSelect: () => {},
    open: false
  };

  render() {
    const {
      open, className, options, onSelect,
      hoverIndex, onClose, selected
    } = this.props;

    return <UIDropdown open={open} onClose={onClose}>
      <ol className={`${className} UISelectDropdown`}>
        {map(options, (option, index) => {
          let itemClassName = "";
          itemClassName += hoverIndex === index ? ' hover' : '';
          itemClassName += selected === option.value ? ' selected' : '';
          return <li
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={itemClassName}>
            {option.name}
          </li>;
        })}
      </ol>
    </UIDropdown>;
  }
}

export interface Option {
    name: string | JSX.Element;
    value: string;
    color?: string;
}

export interface UISelectDropdownProps extends React.Props<UISelectDropdownProps> {
    options: Option[];
    onSelect?: (key: string) => void;
    className?: string;
    open?: boolean;
    hoverIndex?: number;
    onClose?: (e: MouseEvent) => void;
    selected?: string;
}

export default UISelectDropdown;
