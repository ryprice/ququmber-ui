import * as React from "react";
import TetherComponent from "react-tether";

import {
  formatRelativeRangeShortName,
  formatRelativeShortName,
  FuzzyTime,
  FuzzyTimeRange,
} from "ququmber-api";

import {UIDropdown} from "ququmber-ui/controls/UIDropdown";
import FuzzyTimeSelect from "ququmber-ui/fuzzyTime/FuzzyTimeSelect";

export class FuzzyTimeButton extends React.Component<FuzzyTimeButtonProps, FuzzyTimeButtonState> {

  public constructor(props: FuzzyTimeButtonProps, context: any) {
    super(props, context);
    this.state = {opened: false};
  }

  private dropdownToggleClick() {
    this.setState({opened: !this.state.opened});
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
    const {multiselect, range, className, style, value} = this.props;
    let name;
    if (multiselect && range) {
      name = formatRelativeRangeShortName(range);
    } else if (value) {
      name = formatRelativeShortName(value);
    }
    const computedClassName = `FuzzyTimeButton ${className ? className : ""}`;

    return <TetherComponent className={computedClassName} attachment="top left" targetAttachment="bottom left">
      <button
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="true"
        className={computedClassName}
        onClick={() => this.dropdownToggleClick()}
        style={style}
      >
        <span className="octicon octicon-calendar calendar-icon" />
        <span className="name"><span>{name || "None"}</span></span>
        <span className="octicon octicon-chevron-down down-arrow" />
      </button>
      <UIDropdown open={this.state.opened} onClose={()=>this.dropdownToggleClick()}>
        <FuzzyTimeSelect
          selected={value}
          onTimeSelected={this.onTimeSelected.bind(this)}
          multiselect={multiselect}
          onRangeSelected={this.onRangeSelected.bind(this)}
          range={range}
        />
      </UIDropdown>
    </TetherComponent>;
  }
}

export interface FuzzyTimeButtonProps {
  value?: FuzzyTime;
  range?: FuzzyTimeRange;
  onChange?: (time: FuzzyTime) => void;
  onRangeChange?: (range: FuzzyTimeRange) => void;
  className?: string;
  multiselect?: boolean;
  style?: object;
}

export interface FuzzyTimeButtonState {
  opened: boolean;
}

export default FuzzyTimeButton;
