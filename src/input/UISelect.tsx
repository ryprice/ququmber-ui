import {find} from 'lodash';
import * as React from 'react';
import TetherComponent from 'react-tether';

import UISelectDropdown, {UISelectDropdownOption} from 'ququmber-ui/input/UISelectDropdown';
import Stylings from 'ququmber-ui/Stylings';
import useOnOutsideClick from 'ququmber-ui/utils/useOnOutsideClick';

const {useCallback, useMemo, useRef, useState} = React;

export const UISelect = (props: UISelectProps) => {
  const {
    selected,
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
    styling
  } = props;
  const propsOptions = props.options;
  const propsOnSelect = props.onSelect;
  const propsClassName = props.className;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(undefined);
  const rootRef = useRef<HTMLDivElement>();
  const dropdownRef = useRef<HTMLDivElement>();
  const searchInputRef = useRef<HTMLInputElement>();
  const currentQuery = searchInputRef.current ?  searchInputRef.current.value : '';

  const options: UISelectOption[] = useMemo(() => {
    const freeformOption = {
      name: currentQuery || freeformValue,
      value: 'freeform',
      isFreeform: true
    };
    const nullOption: UISelectOption = {
      name: 'None',
      value: null,
      isFreeform: false,
    };
    const showFreeform = (allowFreeform && currentQuery.length > 0 || freeformValue);

    return propsOptions.slice(0, 10)
      .concat(showFreeform ? [freeformOption] : [])
      .concat(allowNull ? [nullOption] : []);
  }, [propsOptions, allowFreeform, currentQuery, freeformValue, allowNull]);

  const renderDefaultFreeformItem = useCallback(() => (
    <span>
      <span className="just">Just '</span>
      {currentQuery || freeformValue}
      <span className="just">'</span>
    </span>
  ), [freeformValue, currentQuery]);

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
  }, [options, renderItem, renderDefaultFreeformItem]);

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
      onSelectFreeform(searchInputRef.current.value);
    } else {
      propsOnSelect(value);
    }
    closeDropdown();
  }, [closeDropdown, onSelectFreeform, propsOnSelect]);

  const onKeyUp = useCallback((event: any) => {
    if (disabled) {
      return;
    }

    switch (event.keyCode) {
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
  }, [onSelect, hoverIndex, options, dropdownOpen, disabled, onQueryChanged, openDropdown]);

  useOnOutsideClick([rootRef, dropdownRef], closeDropdown, dropdownOpen);

  const foundOption = find(options, (o) => o.value === selected);
  const valueOnlyOption = {name: selected, value: selected} as UISelectOption;
  const freeformOption = allowFreeform ? {name: freeformValue, value: 'freeform', isFreeform: true} : null;
  const selectedOption = foundOption || freeformOption || valueOnlyOption;

  const className =
    `UISelect ${propsClassName || ''} ` +
    `${dropdownOpen ? 'focus' : ''} ` +
    (styling ? `styling-${styling}` : '');

  const input = <div
    role="button"
    onClick={openDropdown}
    onKeyUp={onKeyUp}
    className={className}>
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

export type UISelectOption = {
  name: string;
  value?: string;
  color?: string;
  isFreeform?: boolean;
};

export type UISelectProps = {
  options: UISelectOption[];
  selected: string;
  onSelect: (value: string) => any;
  onSelectFreeform?: (value: string) => any;
  onQueryChanged?: (query: string) => void;
  className?: string;
  placeholder?: string;
  renderItem?: (option: UISelectOption, selected: boolean) => React.ReactChild;
  renderDropdownContents?: (children: React.ReactChild[]) => React.ReactChild;
  attachment?: string;
  targetAttachment?: string;
  disabled?: boolean;
  freeformValue?: string;
  allowFreeform?: boolean;
  allowNull?: boolean;
  isSearchable?: boolean;
  styling?: Stylings;
};

export default UISelect;
