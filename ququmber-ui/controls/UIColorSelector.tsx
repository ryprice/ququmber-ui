import {includes} from 'lodash';
import * as React from "react";
import TetherComponent from "react-tether";

import {UIDropdown} from "ququmber-ui/controls/UIDropdown";

const colorOptions = [
    "b80000", "ff6600", "fccb00", "99ff99",
    "008b02", "33ccff", "004dcf", "9900ef",
    "ff3399", "555555", "cccccc", "795548",
];

export class UIColorSelector extends React.Component<UIColorSelectorProps, UIColorSelectorState> {

    constructor(props: UIColorSelectorProps, context?: any) {
        super(props, context);
        this.state = {open: false, custom: null};
    }

    private onColorChanged(value: string) {
        const {onColorChanged} = this.props;
        this.setState({open: false});
        onColorChanged(value);
    }

    private onCustomColorChanged(value: string) {
        this.setState({custom: value});
    }

    private onCustomColorKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        const validHexChars = [
            '1', '2', '3', '4', '5', '6', '7', '8',
            '9', '0', 'A', 'B', 'C', 'D', 'E', 'F'
        ];
        const validKeyCodes = [8, 9, 46, 16, 17, 18];
        const isHexChar = includes(validHexChars, String.fromCharCode(e.keyCode).toUpperCase());
        const isControlKey = includes(validKeyCodes, e.keyCode);
        const overSixChar = this.state.custom && this.state.custom.length >= 6;
        if (
            !isControlKey &&
            (!isHexChar || overSixChar) &&
            !e.ctrlKey && !e.altKey) {
            e.preventDefault();
            return false;
        }
    }

    private renderOption(color: string) {
        return (
            <li
                onClick={() => this.onColorChanged(color)}
                className={color === this.props.value ? 'selected' : ''}
            >
                <div className="colorSample" style={{background: `#${color}`}} />
            </li>
        );
    }

    public render(): JSX.Element {
        const {value} = this.props;
        return <TetherComponent className="uiColorSelector" attachment="top left" targetAttachment="bottom left">
            <button className="uiColorSelector" onClick={()=>this.setState({open: !this.state.open})}>
                <div className="colorSample" style={{background: value ? `#${value}` : 'transparent'}} />
                <span className="octicon octicon-chevron-down"></span>
            </button>
            <UIDropdown open={this.state.open} onClose={()=>this.setState({open: false})}>
                <ol>{colorOptions.map((color) => this.renderOption(color))}</ol>
                <div className="customArea">
                    <div className="colorSample" style={{background: `#${this.state.custom}`}} />
                    <input
                        type="text"
                        onChange={(e) => this.onCustomColorChanged(e.target.value)}
                        placeholder="#CUSTOM"
                        onKeyDown={(e) => this.onCustomColorKeyDown(e)}
                    />
                    <button onClick={() => this.onColorChanged(this.state.custom)}>Select</button>
                </div>
            </UIDropdown>
        </TetherComponent>;
    }
}

export interface UIColorSelectorProps extends React.Props<UIColorSelector> {
    value?: string;
    onColorChanged: (value?: string) => void;
}

export interface UIColorSelectorState {
    open: boolean;
    custom: string;
}
