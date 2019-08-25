import {debounce, filter, find, includes, map} from 'lodash';
import * as React from 'react';
import TetherComponent from 'react-tether';

import UISelectDropdown, {UISelectDropdownOption} from 'ququmber-ui/controls/UISelectDropdown';
import useOnOutsideClick from 'ququmber-ui/utils/useOnOutsideClick';

const {useCallback, useMemo, useRef, useState} = React;

export const UISelect = (props: UISelectProps) => {
  const {
    selected,
    className,
    placeholder,
    renderItem,
    attachment,
    targetAttachment,
    onQueryChanged,
    disabled,
    allowFreeform,
    onSelectFreeform,
    freeformValue,
    allowNull,
    isSearchable,
  } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(undefined);
  const lastValueRef = useRef('');
  const lastValue = lastValueRef.current;
  const rootRef = useRef<HTMLDivElement>();
  const dropdownRef = useRef<HTMLDivElement>();
  const searchInputRef = useRef<HTMLInputElement>();
  const currentQuery = searchInputRef.current ?  searchInputRef.current.value : '';

  const options: Option[] = useMemo(() => {
    const freeformOption = {
      name: currentQuery || freeformValue,
      value: 'freeform',
      isFreeform: true
    };
    const nullOption: Option = {
      name: 'None',
      value: null,
      isFreeform: false,
    };
    const showFreeform = (allowFreeform && currentQuery.length > 0 || freeformValue);

    return props.options.slice(0, 10)
      .concat(showFreeform ? [freeformOption] : [])
      .concat(allowNull ? [nullOption] : []);
  }, [props.options, allowFreeform, currentQuery, freeformValue, allowNull]);

  const renderDefaultFreeformItem = () => (
    <span>
      <span className="just">Just '</span>
      {currentQuery || freeformValue}
      <span className="just">'</span>
    </span>
  );

  const optionsWithRenderedName: UISelectDropdownOption[] = useMemo(() => {
    return options.map(option => {
      let renderedContent = null;
      if (option.isFreeform) {
        renderedContent = renderItem ? renderItem(option, false) : renderDefaultFreeformItem();
      } else {
        renderedContent = renderItem ? renderItem(option, false) : option.name;
      }
      return {...option, name: renderedContent};
    });
  }, [options, renderItem]);

  const openDropdown = useCallback(() => {
    if (!disabled) {
      setDropdownOpen(true);
      setTimeout(() => searchInputRef.current.focus(), 50);
    }
  }, [disabled]);

  const closeDropdown = useCallback(() => {
    setHoverIndex(undefined);
    setDropdownOpen(false);
  }, []);

  const onSelect = useCallback((value: string) => {
    if (value === 'freeform') {
      props.onSelectFreeform(searchInputRef.current.value);
    } else {
      props.onSelect(value);
    }
    closeDropdown();
  }, [closeDropdown, props.onSelect]);

  const onKeyUp = useCallback((event: any) => {
    if (disabled) {
      return;
    }

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
    onQueryChanged && onQueryChanged(searchInputRef.current.value);
    return false;
  }, [onSelect, hoverIndex, options, closeDropdown, dropdownOpen, disabled, onQueryChanged]);

  useOnOutsideClick([rootRef, dropdownRef], closeDropdown, dropdownOpen);

  const foundOption = find(options, (o) => o.value === selected);
  const valueOnlyOption = {name: selected, value: selected} as Option;
  const freeformOption = allowFreeform ? {name: freeformValue, value: 'freeform', isFreeform: true} : null;
  const selectedOption = foundOption || freeformOption || valueOnlyOption;

  const input = <div
    role="button"
    onClick={openDropdown}
    onKeyUp={onKeyUp}
    className={`UISelect ${className || ''} ${dropdownOpen ? 'focus' : ''}`}>
    <span className="selectedOptions">{renderItem ? renderItem(selectedOption, true) : selectedOption.name}</span>
    <span className="octicon octicon-chevron-down down-arrow" key="down-arrow" />
  </div>;

  const searchInput = <input
    className="searchInput"
    onKeyUp={onKeyUp}
    ref={searchInputRef}
    placeholder="Search"
  />;

  const renderDropdownContents = (children: React.ReactChild[]) => {
    const content = <div className="UISelectDropdown">
      {isSearchable ? searchInput : null}
      {children}
    </div>;
    if (props.renderDropdownContents) {
      props.renderDropdownContents([content]);
    }
    return content;
  };

  return <div ref={rootRef} tabIndex={0}>
    {input}
    {dropdownOpen && <TetherComponent
      attachment={attachment || 'top left'}
      targetAttachment={targetAttachment || 'bottom left'}>
      <div />
      <div ref={dropdownRef}>
        <UISelectDropdown
          className="UISelectDropdown"
          options={optionsWithRenderedName}
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
  value?: string;
  color?: string;
  isFreeform?: boolean;
}

export interface UISelectProps {
  options: Option[];
  selected: string;
  onSelect: (value: string) => any;
  onSelectFreeform?: (value: string) => any;
  onQueryChanged?: (query: string) => void;
  className?: string;
  placeholder?: string;
  renderItem?: (option: Option, selected: boolean) => React.ReactChild;
  renderDropdownContents?: (children: React.ReactChild[]) => React.ReactChild;
  attachment?: string;
  targetAttachment?: string;
  disabled?: boolean;
  freeformValue?: string;
  allowFreeform?: boolean;
  allowNull?: boolean;
  isSearchable?: boolean;
}

export default UISelect;
