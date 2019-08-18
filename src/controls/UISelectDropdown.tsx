import {map} from 'lodash';
import * as React from 'react';

import UIDropdown from 'ququmber-ui/popup/UIDropdown';

export class UISelectDropdown extends React.Component<UISelectDropdownProps, {}> {
  public static defaultProps = {
    className: '',
    onSelect: () => {},
    open: false
  };

  render() {
    const {
      open, className, options, onSelect,
      hoverIndex, onClose, selected, renderDropdownContents
    } = this.props;

    const optionsNodes = map(options, (option, index) => {
      let itemClassName = 'item ';
      itemClassName += hoverIndex === index ? 'hover ' : '';
      itemClassName += selected === option.value ? 'selected ' : '';

      return <div
        key={option.value}
        onClick={() => onSelect(option.value)}
        className={itemClassName}>
        {option.name}
      </div>;
    });

    if (renderDropdownContents) {
      return <UIDropdown open={open} onClose={onClose}>
        {renderDropdownContents(optionsNodes)}
      </UIDropdown>;
    }

    return <UIDropdown open={open} onClose={onClose}>
      <div className={`${className} UISelectDropdown`}>
        {optionsNodes}
      </div>
    </UIDropdown>;
  }
}

export interface Option {
    name: React.ReactChild;
    value: string;
    color?: string;
}

export interface UISelectDropdownProps extends React.Props<UISelectDropdownProps> {
    options: Option[];
    onSelect?: (key: string) => void;
    className?: string;
    open?: boolean;
    hoverIndex?: number;
    onClose?: () => void;
    selected?: string;
    renderDropdownContents?: (children: React.ReactChild[]) => React.ReactChild;
}

export default UISelectDropdown;
