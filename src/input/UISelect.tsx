import {css} from '@emotion/react';
import {find} from 'lodash';
import {useCallback, useMemo, useRef, useState, MutableRefObject} from 'react';
import {mergeRefs} from 'react-merge-refs';
import TetherComponent from 'react-tether';

import Colors from 'ququmber-ui/Colors';
import {UIAbstractInputStyle} from 'ququmber-ui/input/UIAbstractInput';
import UISelectDropdown, {UISelectDropdownOption} from 'ququmber-ui/input/UISelectDropdown';
import Stylings from 'ququmber-ui/Stylings';
import useMobileLayout from 'ququmber-ui/utils/useMobileLayout';
import useOnOutsideClick from 'ququmber-ui/utils/useOnOutsideClick';

const styles = {
  root: css`
    position: relative;
    overflow: auto;
    display: flex;
    flex-direction: row;
    padding: .3em;
    cursor: pointer;
    align-items: center;
  `,
  selectedOptions: css`
    flex-grow: 1;
  `,
  downArrow: css`
    height: 100%;
    vertical-align: middle;
    padding-left: 10px;
    flex-grow: 0;
    flex-shrink: 0;
    float: right;
    display: flex;
  `,
  dropdown: css`
    min-width: 300px;
    display: flex;
    flex-direction: column;
  `,
  searchInput: css`
    margin: 10px;
    padding: 5px;
  `,
  just: css`
    color: ${Colors.QUIET};
  `,
  hiddenSelect: css`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  `,
};

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
  const isMobileLayout = useMobileLayout();
  const selectHtmlId = useMemo(() => Math.random().toString(36).substring(2, 15), []);

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

    const maybeLimitedResults = !isSearchable ? propsOptions : propsOptions.slice(0, 10);

    return maybeLimitedResults
      .concat(showFreeform ? [freeformOption] : [])
      .concat(allowNull ? [nullOption] : []);
  }, [propsOptions, allowFreeform, currentQuery, freeformValue, allowNull]);

  const renderDefaultFreeformItem = useCallback(() => (
    <span>
      <span css={styles.just}>Just '</span>
      {currentQuery || freeformValue}
      <span css={styles.just}>'</span>
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
    `${propsClassName || ''} ` +
    `${dropdownOpen ? 'focus' : ''} ` +
    (styling ? `styling-${styling}` : '');

  const hiddenSelect = <select
    id={selectHtmlId}
    css={styles.hiddenSelect}
    value={selected}
    onChange={(e: any) => onSelect(e.target.value)}
    disabled={disabled}>
    {options.map(option => <option key={option.value} value={option.value}>{option.name}</option>)}
  </select>;

  const input = <div
    css={[UIAbstractInputStyle, styles.root]}
    role="button"
    onClick={openDropdown}
    onKeyUp={onKeyUp}
    className={className}>
    {isMobileLayout && hiddenSelect}
    <span css={styles.selectedOptions}>{renderItem ? renderItem(selectedOption, true) : selectedOption.name}</span>
    <span className="octicon octicon-chevron-down" css={styles.downArrow} key="down-arrow" />
  </div>;

  const searchInput = <input
    css={styles.searchInput}
    onKeyUp={onKeyUp}
    ref={searchInputRef}
    placeholder="Search"
  />;

  const renderDropdownContents = (children: React.ReactChild[]) => {
    const content = <div css={styles.dropdown}>
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
    {dropdownOpen && !isMobileLayout && <TetherComponent
      attachment={attachment || 'top left'}
      targetAttachment={targetAttachment || 'bottom left'}
      renderTarget={(tetherRef: MutableRefObject<HTMLDivElement>) => (
        <div ref={tetherRef} />
      )}
      renderElement={(tetherRef: MutableRefObject<HTMLDivElement>) => (
        <div ref={mergeRefs([dropdownRef, tetherRef])}>
          <UISelectDropdown
            css={styles.dropdown}
            options={optionsWithRenderedName}
            hoverIndex={hoverIndex}
            onSelect={onSelect}
            open={dropdownOpen}
            renderDropdownContents={renderDropdownContents}
          />
        </div>
      )}
    />}
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
  renderItem?: (option: UISelectOption, renderForButton: boolean) => React.ReactChild;
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
