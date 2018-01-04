import {map} from "lodash";
import * as React from "react";

export class UISelectDropdown extends React.Component<UISelectDropdownProps, {}> {
    public static defaultProps = {
        className: "",
        onSelect: () => {},
        open: false
    };

    render() {
        const {open, className, options, onSelect, hoverIndex} = this.props;
        if (open) {
            return <div><ol className={`${className} uiDropdown uiSelectDropdown`}>
                {map(options, (option, index) => (
                    <li
                        key={option.value}
                        onClick={() => onSelect(option.value)}
                        className={hoverIndex === index ? 'hover' : ''}>
                        {option.name}
                    </li>
                ))}
            </ol></div>;
        }
        return <div />;
    }
}

export interface Option {
    name: string;
    value: string;
    color?: string;
}

export interface UISelectDropdownProps extends React.Props<UISelectDropdownProps> {
    options: Option[];
    onSelect?: (key: string) => void;
    className?: string;
    open?: boolean;
    hoverIndex?: number;
}

export default UISelectDropdown;
