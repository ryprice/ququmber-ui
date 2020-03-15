import * as React from 'react';
import TetherComponent from 'react-tether';

import {
  formatRelativeRangeShortName,
  formatRelativeShortName,
  FuzzyTime,
  FuzzyTimeRange,
} from 'listlab-api';

import FuzzyTimeSelect from 'ququmber-ui/fuzzyTime/FuzzyTimeSelect';
import UIDropdown from 'ququmber-ui/popup/UIDropdown';

export class FuzzyTimeButton extends React.Component<FuzzyTimeButtonProps, FuzzyTimeButtonState> {

  readonly state: FuzzyTimeButtonState = {
    opened: false
  };

  static readonly defaultProps = {
    disabled: false,
  };

  public constructor(props: FuzzyTimeButtonProps, context: any) {
    super(props, context);
  }

  dropdownToggleClick = () => {
    if (!this.props.disabled) {
      this.setState({opened: !this.state.opened});
    }
  }

  closeDropdown = () => {
    this.setState({opened: false});
  }

  private onTimeSelected(time: FuzzyTime) {
    this.setState({opened: false});
    this.props.onChange(time);
  }

  private onRangeSelected(range: FuzzyTimeRange) {
    this.setState({opened: false});
    this.props.onRangeChange(range);
  }

  render() {
    const {
      multiselect,
      range,
      className,
      style,
      value,
      attachment,
      targetAttachment,
      disabled,
    } = this.props;

    let name;
    if (multiselect && range) {
      name = formatRelativeRangeShortName(range);
    } else if (value) {
      name = formatRelativeShortName(value);
    }

    const computedClassName = `UIAbstractInput FuzzyTimeButton ${className ? className : ''}`;

    return <TetherComponent
      attachment={attachment || 'top left'}
      targetAttachment={targetAttachment || 'bottom left'}
    >
      <button
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="true"
        disabled={disabled}
        className={computedClassName}
        onClick={this.dropdownToggleClick}
        style={style}
      >
        <span className="octicon octicon-calendar calendar-icon" />
        <span className="name"><span>{name || 'None'}</span></span>
        <span className="octicon octicon-chevron-down down-arrow" />
      </button>
      <UIDropdown
        open={this.state.opened}
        onClose={this.closeDropdown}
        className="FuzzyTimeButtonDropdown"
      >
        <FuzzyTimeSelect
          selected={value}
          onTimeSelected={this.onTimeSelected.bind(this)}
          multiselect={multiselect}
          onRangeSelected={this.onRangeSelected.bind(this)}
          selectedRange={range}
        />
      </UIDropdown>
    </TetherComponent>;
  }
}

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

type FuzzyTimeButtonState = {
  opened: boolean;
};

export default FuzzyTimeButton;
