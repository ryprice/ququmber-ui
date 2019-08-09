import {includes} from 'lodash';
import * as React from 'react';
import TetherComponent from 'react-tether';

import UIButton from 'ququmber-ui/button/UIButton';
import Colors from 'ququmber-ui/Colors';
import UIDropdown from 'ququmber-ui/popup/UIDropdown';
import Stylings from 'ququmber-ui/Stylings';
import {isDarkColor} from 'ququmber-ui/utils/colorUtils';

const colorOptions = [
  'b80000', 'ff6600', 'fccb00', '99ff99',
  '008b02', '33ccff', '004dcf', '9900ef',
  'ff3399', '555555', 'cccccc', '795548',
];

export class UIColorSelector extends React.Component<UIColorSelectorProps, UIColorSelectorState> {

  private inputRef: HTMLInputElement;

  constructor(props: UIColorSelectorProps) {
    super(props);
    this.state = {
      custom: props.value ? props.value.toUpperCase() : null,
    };
  }

  componentWillReceiveProps(nextProps: UIColorSelectorProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        custom: nextProps.value.toUpperCase(),
      });
    }
  }

  private onColorChanged(value: string) {
    const {onColorChanged, onClose} = this.props;
    onClose();
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
      .join('');

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

  public render() {
    const {value, children, open, onClose} = this.props;
    const {custom} = this.state;

    return <TetherComponent
      className="UIColorSelector"
      attachment="top left"
      targetAttachment="bottom left">
      {children}
      <UIDropdown
        open={open}
        onClose={onClose}>
        <ol>{colorOptions.map((color) => this.renderOption(color))}</ol>
        <div className="customArea">
          <div
            className="colorSample"
            style={{background: `#${custom}`}}
          />
          <input
            type="text"
            value={this.state.custom}
            ref={(ref: HTMLInputElement) => {this.inputRef = ref;}}
            onKeyUp={this.onCustomColorChanged}
            placeholder="FFFFFF"
          />
        </div>
        <div className="buttons">
          <UIButton
            styling={Stylings.OUTLINE}
            onClick={onClose}>
            Cancel
          </UIButton>
          <UIButton
            styling={Stylings.GO}
            onClick={() => this.onColorChanged(this.inputRef.value)}>
            Done
          </UIButton>
        </div>
      </UIDropdown>
    </TetherComponent>;
  }
}

export interface UIColorSelectorProps extends React.Props<UIColorSelector> {
  value?: string;
  open: boolean;
  onColorChanged: (value?: string) => void;
  children: React.ReactNode;
  onClose: () => void;
}

export interface UIColorSelectorState {
  custom: string;
}

export default UIColorSelector;
