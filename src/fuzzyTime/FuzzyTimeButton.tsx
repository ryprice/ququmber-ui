import {css} from '@emotion/react';
import {useState, useCallback, MutableRefObject} from 'react';
import TetherComponent from 'react-tether';

import {FuzzyTime, FuzzyTimeRange} from 'listlab-api';
import {formatRelativeRangeShortName, formatRelativeShortName} from 'listlab-api/fuzzyTime/FuzzyTimeFormatters';

import FuzzyTimeSelect from 'ququmber-ui/fuzzyTime/FuzzyTimeSelect';
import UIDropdown from 'ququmber-ui/popup/UIDropdown';

const styles = {
  root: css`
    position: relative;
    display: flex;
    text-align: left;
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
  calendarIcon: css`
    padding-right: 5px;
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
  `,
  name: css`
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    overflow: hidden;
  `,
  nameClamp: css`
    word-wrap: break-word;
    height: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  dropdown: css`
    height: 490px;
    width: 270px;
    padding: 0;
  `,
};

export const FuzzyTimeButton = (props: FuzzyTimeButtonProps) => {
  const {
    onChange,
    onRangeChange,
    disabled,
    multiselect,
    range,
    className,
    style,
    value,
    attachment,
    targetAttachment,
  } = props;

  const [open, setOpen] = useState(false);

  const dropdownToggleClick = useCallback(() => {
    if (!disabled) {
      setOpen(!open);
    }
  }, [disabled, open]);

  const closeDropdown = useCallback(() => {
    setOpen(false);
  }, []);

  const onTimeSelected = useCallback((time: FuzzyTime) => {
    setOpen(false);
    onChange(time);
  }, [onChange]);

  const onRangeSelected = useCallback((range: FuzzyTimeRange) => {
    setOpen(false);
    onRangeChange(range);
  }, [onRangeChange]);


  let name: string;
  if (multiselect && range) {
    name = formatRelativeRangeShortName(range);
  } else if (value) {
    name = formatRelativeShortName(value);
  }

  const computedClassName = `UIAbstractInput ${className ? className : ''}`;

  return <TetherComponent
    attachment={attachment || 'top left'}
    targetAttachment={targetAttachment || 'bottom left'}
    renderTarget={(tetherRef: MutableRefObject<HTMLButtonElement>) => (
      <button
        ref={tetherRef}
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="true"
        disabled={disabled}
        css={styles.root}
        className={computedClassName}
        onClick={dropdownToggleClick}
        style={style}>
        <span css={styles.calendarIcon} className="octicon octicon-calendar" />
        <span css={styles.name}>
          <span css={styles.nameClamp}>{name || 'None'}</span>
        </span>
        <span css={styles.downArrow} className="octicon octicon-chevron-down" />
      </button>
    )}
    renderElement={(tetherRef: MutableRefObject<HTMLDivElement>) => (
      <UIDropdown
        ref={tetherRef}
        open={open}
        onClose={closeDropdown}
        css={styles.dropdown}>
        <FuzzyTimeSelect
          selected={value}
          onTimeSelected={onTimeSelected}
          multiselect={multiselect}
          onRangeSelected={onRangeSelected}
          selectedRange={range}
        />
      </UIDropdown>
    )}
  />;
};

export type FuzzyTimeButtonProps = {
  value?: FuzzyTime;
  range?: FuzzyTimeRange;
  onChange?: (time: FuzzyTime) => void;
  onRangeChange?: (range: FuzzyTimeRange) => void;
  className?: string;
  multiselect?: boolean;
  style?: object;
  attachment?: string;
  targetAttachment?: string;
  disabled?: boolean;
};

export default FuzzyTimeButton;
