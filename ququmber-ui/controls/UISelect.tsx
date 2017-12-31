import {map} from 'lodash';
import * as React from 'react';

export class UISelect extends React.Component<UISelectProps, {}> {
    public static defaultProps = {
        defaultValue: null as string,
        onSelect: ()=>{}
    };

    render() {
        return <select
            className="uiSelect"
            onChange={(e) => this.props.onSelect((e.target as HTMLSelectElement).value)}
        >
            {map(this.props.options, (value, key) => {
                const selected = key === this.props.defaultValue ? {selected: "selected"} : {};
                return <option
                    key={key}
                    value={key}
                    {...selected}
                >{value}</option>;
            })}
        </select>;
    }
}

export interface UISelectProps extends React.Props<UISelect> {
    defaultValue?: string;
    onSelect?: (key: string) => void;
    options: {[key: string]: string};
}

export default UISelect;
