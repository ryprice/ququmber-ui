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
        let name;
        if (this.props.multiselect && this.props.range) {
            name = formatRelativeRangeShortName(this.props.range);
        } else if (this.props.value) {
            name = formatRelativeShortName(this.props.value);
        }

        const className = `FuzzyTimeButton ${this.props.className ? this.props.className : ""}`;

        return <TetherComponent className={className} attachment="top left" targetAttachment="bottom left">
            <button
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
                className={className}
                onClick={() => this.dropdownToggleClick()}
            >
                <span className="octicon octicon-calendar calendar-icon" />
                <span className="name"><span>{name || "None"}</span></span>
                <span className="octicon octicon-chevron-down down-arrow" />
            </button>
            <UIDropdown open={this.state.opened} onClose={()=>this.dropdownToggleClick()}>
                <FuzzyTimeSelect
                    selected={this.props.value}
                    onTimeSelected={this.onTimeSelected.bind(this)}
                    multiselect={this.props.multiselect}
                    onRangeSelected={this.onRangeSelected.bind(this)}
                    range={this.props.range}
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
}

export interface FuzzyTimeButtonState {
    opened: boolean;
}

export default FuzzyTimeButton;
