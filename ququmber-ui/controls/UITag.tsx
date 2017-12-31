import * as React from "react";

import {isDarkColor} from "ququmber-ui/utils/colorUtils";

export class UITag extends React.Component<UITagProps, {}> {
    render() {
        const {color, name, onRemoved, canRemove} = this.props;
        const style = color ? {background: `#${color}`} : {};
        return <div className={`uiTag ${color && isDarkColor(color) ? 'darkText' : 'lightText'}`} style={style}>
            {name}
            {canRemove !== false &&
                <button className="remove" onClick={onRemoved ? onRemoved : () => {}}>
                    <span className="octicon octicon-x" />
                </button>
            }
        </div>;
    }
}

export interface UITagProps extends React.Props<UITag> {
    name: string;
    onRemoved?: () => void;
    color?: string;
    canRemove?: boolean;
}

export default UITag;
