import * as React from "react";

import {UIModal} from "ququmber-ui/controls/UIModal";
import {UIOverlay} from "ququmber-ui/controls/UIOverlay";

export const Level = {
    Info: 0,
    Warning: 1,
    Error: 2
};

export class UIMessageModal extends React.Component<UIMessageModalProps, {}> {
    render() {
        return <UIOverlay><UIModal>
            <div className="UIMessageModal">
                <p className="title">{this.props.title}</p>
                <p className="message">{this.props.message}</p>
                <div className="buttonArea">
                    <button onClick={this.props.onCancel}>Cancel</button>
                    <button onClick={this.props.onConfirm}>Confirm</button>
                </div>
            </div>
        </UIModal></UIOverlay>;
    }
}

export interface UIMessageModalProps extends React.Props<UIMessageModal> {
    level?: number;
    title: string;
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export default UIMessageModal;
