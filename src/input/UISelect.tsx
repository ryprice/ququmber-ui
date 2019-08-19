import {debounce, filter, find, includes, map} from 'lodash';
import * as React from 'react';
import TetherComponent from 'react-tether';

import UISelectDropdown from 'ququmber-ui/controls/UISelectDropdown';
import useOnOutsideClick from 'ququmber-ui/utils/useOnOutsideClick';

const {useCallback, useRef, useState} = React;

export const UISelect = (props: UISelectProps) => {
  const {
    options,
    selected,
    className,
    placeholder,
    renderItem,
    attachment,
    targetAttachment,
    renderDropdownContents,
    onQueryChanged,
  } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(undefined);
  const lastValueRef = useRef('');
  const lastValue = lastValueRef.current;
  const rootRef = useRef<HTMLDivElement>();
  const dropdownRef = useRef<HTMLDivElement>();

  const openDropdown = useCallback(() => setDropdownOpen(true), []);
  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
    setHoverIndex(undefined);
  }, []);

  const onSelect = useCallback((value: string) => {
    props.onSelect(value);
    closeDropdown();
  }, [closeDropdown]);

  const onKeyUp = useCallback((event: any) => {
    switch(event.keyCode) {
      case 13:
        onSelect(options[hoverIndex].value);
        break;

      case 38:
        setHoverIndex(hoverIndex != null ? Math.max(hoverIndex - 1,  0) : undefined);
        break;

      case 40:
        if (!dropdownOpen) {
          openDropdown();
          setHoverIndex(0);
        }
        const optionsCount = options.length;
        setHoverIndex(hoverIndex != null ? Math.min(hoverIndex + 1, optionsCount - 1) : 0);
        break;
    }
    return false;
  }, [onSelect, hoverIndex, options, closeDropdown, dropdownOpen]);

  useOnOutsideClick([rootRef, dropdownRef], closeDropdown, dropdownOpen);

  const defaultRenderItem = (option: Option) => {
    return <span>{option.name}</span>;
  };

  const foundOption = find(options, (o) => o.value === selected);
  const valueOnlyOption = {name: selected, value: selected} as Option;
  const selectedOption = foundOption || valueOnlyOption;

  const input = <div
    onKeyDown={() => false}
    onKeyPress={() => false}
    contentEditable={true}
    onKeyUp={onKeyUp}
    className={`UISelect ${className || ''} ${dropdownOpen ? 'focus' : ''}`}>
    <span className="selectedOptions">{selectedOption.name}</span>
    <span className="octicon octicon-chevron-down down-arrow" />
  </div>;

  return <div ref={rootRef} onClick={openDropdown} tabIndex={0}>
    {input}
    {dropdownOpen && <TetherComponent
      attachment={attachment || 'top left'}
      targetAttachment={targetAttachment || 'bottom left'}>
      <div />
      <div ref={dropdownRef}>
        <UISelectDropdown
          className="UIMultiInputDropdown"
          options={options.slice(0, 10).map(option => ({
            ...option,
            name: renderItem ? renderItem(option, false) : option.name
          }))}
          hoverIndex={hoverIndex}
          onSelect={onSelect}
          open={dropdownOpen}
          renderDropdownContents={renderDropdownContents}
        />
      </div>
    </TetherComponent>}
  </div>;
};

export interface Option {
  name: string;
  value: string;
  color?: string;
  canRemove?: boolean;
}

export interface UISelectProps {
  options: Option[];
  selected: string;
  onSelect: (value: string) => any;
  className?: string;
  placeholder?: string;
  onQueryChanged?: (query: string) => void;
  renderItem?: (option: Option, selected: boolean) => React.ReactChild;
  attachment?: string;
  targetAttachment?: string;
  renderDropdownContents?: (children: React.ReactChild[]) => React.ReactChild;
}

export interface UIMultiInputState {
  dropdownOpen: boolean;
  hoverIndex: number;
}

export default UISelect;
