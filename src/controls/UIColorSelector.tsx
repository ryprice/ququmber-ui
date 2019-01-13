import {includes} from 'lodash';
import * as React from 'react';
import TetherComponent from 'react-tether';

import * as COLORS from 'ququmber-ui/Colors';
import UIDropdown from 'ququmber-ui/controls/UIDropdown';
import {isDarkColor} from 'ququmber-ui/utils/colorUtils';

const colorOptions = [
  'b80000', 'ff6600', 'fccb00', '99ff99',
  '008b02', '33ccff', '004dcf', '9900ef',
  'ff3399', '555555', 'cccccc', '795548',
];

export class UIColorSelector extends React.Component<UIColorSelectorProps, UIColorSelectorState> {

  private inputRef: HTMLInputElement;

  readonly state: UIColorSelectorState = {
    open: false,
    custom: null
  };

  private onColorChanged(value: string) {
    const {onColorChanged} = this.props;
    this.setState({open: false});
    onColorChanged(value);
  }

  onCustomColorChanged = () => {
    const validHexChars = [
      '1', '2', '3', '4', '5', '6', '7', '8',
      '9', '0', 'A', 'B', 'C', 'D', 'E', 'F'
    ];
    const filteredValue = this.inputRef.value
      .split('')
      .filter((char: string) => includes(validHexChars, char.toUpperCase()))
      .map((char: string) => char.toUpperCase())
      .join('')
      .substr(0, 6);

    this.setState({custom: filteredValue});
    // sets custom back to null
    setTimeout(() => this.setState({custom: null}), 10);
    return true;
  }

  private renderOption(color: string) {
    return (
      <li
        onClick={() => this.onColorChanged(color)}
        className={color === this.props.value ? 'selected' : ''}
        key={color}
      >
        <div className="colorSample" style={{background: `#${color}`}} />
      </li>
    );
  }

  public render(): JSX.Element {
    const {value} = this.props;

    return <TetherComponent
      className="UIColorSelector"
      attachment="top left"
      targetAttachment="bottom left"
    >
      <button
        className="UIColorSelector UIColorSelectorButton"
        onClick={()=>this.setState({open: !this.state.open})}>
        <div
          className="colorSample"
          style={{background: value ? `#${value}` : 'transparent'}}>
          <i
            className="fa fa-palette"
            style={{color: value
              ? (isDarkColor(`#${value}`) ? COLORS.WHITE : COLORS.BASEFONT)
              : COLORS.BASEFONT
            }}
          />
        </div>
      </button>
      <UIDropdown
        open={this.state.open}
        onClose={()=>this.setState({open: false})}
      >
        <ol>{colorOptions.map((color) => this.renderOption(color))}</ol>
        <div className="customArea">
          <div
            className="colorSample"
            style={{background: `#${this.state.custom}`}}
          />
          <input
            type="text"
            value={this.state.custom}
            ref={(ref: HTMLInputElement) => {this.inputRef = ref;}}
            onKeyUp={this.onCustomColorChanged}
            placeholder="FFFFFF"
          />
          <button
            onClick={() => this.onColorChanged(this.inputRef.value)}>
            Custom
          </button>
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

export default UIColorSelector;
