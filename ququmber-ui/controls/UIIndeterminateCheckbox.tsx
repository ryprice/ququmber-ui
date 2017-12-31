import * as React from "react";
import TetherComponent from "react-tether";

import {UIDropdown} from "ququmber-ui/controls/UIDropdown";

export class UIIndeterminateCheckbox extends React.Component<UIIndeterminateCheckboxProps, UIIndeterminateCheckboxState> {

    constructor(props: UIIndeterminateCheckboxProps, context?: any) {
        super(props, context);
        this.state = {open: false};
    }

    private onCheckboxChanged(e: any) {
        const {value, onChange} = this.props;
        if (value === false) {
            onChange(true);
        } else if (value === true) {
            onChange(undefined);
        } else {
            onChange(false);
        }
    }

    private renderOption(value: boolean, name: string, icon: string) {
        return (
            <li
                onClick={() => {this.setState({open: false}); this.props.onChange(value);}}
                className={value === this.props.value ? 'selected' : ''}
            >
                <div className="innerCheckbox"><span className={`octicon octicon-${icon}`} /></div>
                {name}
            </li>
        );
    }

    public render(): JSX.Element {
        const {value, className} = this.props;

        let completedChar = <span className="octicon octicon-dash" />;
        if (value === true) {
            completedChar = <span className="octicon octicon-check" />;
        } else if (value === false) {
            completedChar = <span />;
        }


        return <TetherComponent attachment="top left" targetAttachment="bottom left" className="uiIndeterminateCheckbox">
            <button className={`uiIndeterminateCheckbox ${className ? className : ''}`}>
                <div className="innerCheckbox" onClick={e=>this.onCheckboxChanged(e)}>{completedChar}</div>
                <span className="octicon octicon-chevron-down" onClick={()=>this.setState({open: !this.state.open})}></span>
            </button>
            <UIDropdown open={this.state.open} onClose={()=>this.setState({open: false})}><ol>
                {this.renderOption(true, 'Complete', 'check')}
                {this.renderOption(false, 'Incomplete', null)}
                {this.renderOption(undefined, 'Any', 'dash')}
            </ol></UIDropdown>
        </TetherComponent>;
    }
}

export interface UIIndeterminateCheckboxProps extends React.Props<UIIndeterminateCheckbox> {
    value?: boolean;
    onChange: (value?: boolean) => void;
    className?: string;
}

export interface UIIndeterminateCheckboxState {
    open: boolean;
}
