import {css} from '@emotion/react';
import * as Color from 'color';
import {includes, times} from 'lodash';
import * as React from 'react';
import TetherComponent from 'react-tether';

import UIButton from 'ququmber-ui/button/UIButton';
import Colors from 'ququmber-ui/Colors';
import UIDropdown from 'ququmber-ui/popup/UIDropdown';
import Stylings from 'ququmber-ui/Stylings';

const {useRef, useState, useEffect} = React;

const baseColors = [
  'e44a5c',
  'ff6600',
  'fccb00',
  'b5ea8c',
  '30cdbb',
  '33ccff',
  '004dcf',
  '9900ef',
  'ff3399',
  '555555',
  '795548',
];

const styles = {
  colorSwatch: css`
    width: 35px;
    height: 35px;
    background: transparent;
    text-align: center;
    float: left;
    cursor: pointer;
    flex-shrink: 0;
    box-sizing: content-box;
    border: 0;
  `,
  shadeColumn: css`
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
  `,
  shadeItem: css`
    text-align: left;
    float: left;
    overflow: auto;
    width: 35px;
    height: 35px;
  `,
  customArea: css`
    display: flex;
    margin: 10px;
    box-sizing: border-box;
  `,
  customInput: css`
    flex-grow: 1;
    flex-shrink: 1;
    min-width: 0;
    color: ${Colors.BASEFONT};
    font-family: monospace;
    padding: 0 .5em;
    letter-spacing: .1em;
    font-size: 18px;
    border: 1px solid $color-white;
    box-sizing: border-box;
    margin-left: 10px;
  `
};

const shadesFromBaseColor = (color: string) => {
  const hsl = Color('#' + color).hsl();
  const shadesCount = 7;
  return times(shadesCount - 1).reverse().map(i =>
    hsl.lightness(100/(shadesCount + 1) * (i + 1.5)).hex().slice(1)
  );
};

type UIColorSelectorOptionProps = {
  color: string;
  onColorChange: (color: string) => void;
};

const UIColorSelectorOption = (props: UIColorSelectorOptionProps) => {
  const {color, onColorChange} = props;
  return <div
    onClick={() => onColorChange(color)}
    css={styles.shadeItem}
    key={color}
  >
    <div css={styles.colorSwatch} style={{background: `#${color}`}} />
  </div>;
};

const UIColorSelector = (props: UIColorSelectorProps) => {
  const {value, open, onClose, children} = props;
  const inputRef = useRef<HTMLInputElement>();
  const [custom, setCustom] = useState<string>(value != null ? props.value.toUpperCase() : null);
  // Allow a custom color above 6 characters for making edits
  const customTrimmed = custom != null ? custom.slice(0, 6) : null;

  useEffect(() => {
    setCustom(value != null ? value.toUpperCase() : null);
  }, [value, open]);

  const onColorChange = (value: string) => {
    onClose();
    props.onColorChange(value);
  };

  const onCustomColorChanged = () => {
    if (inputRef.current.value === null || inputRef.current.value.length < 1) {
      return '#';
    }

    const validHexChars = [
      '1', '2', '3', '4', '5', '6', '7', '8',
      '9', '0', 'A', 'B', 'C', 'D', 'E', 'F'
    ];
    const filteredValue = inputRef.current.value
      .slice(1)
      .split('')
      .filter((char: string) => includes(validHexChars, char.toUpperCase()))
      .map((char: string) => char.toUpperCase())
      .join('');

    setCustom(filteredValue);
    return true;
  };

  return <TetherComponent
    className="UIColorSelector"
    attachment="top left"
    targetAttachment="bottom left">
    {children}
    <UIDropdown
      open={open}
      onClose={onClose}>
      <div style={{display: 'flex', flexDirection: 'row', gap: '2px', margin: '10px'}}>
        {baseColors.map(baseColor =>
          <div css={styles.shadeColumn} key={baseColor}>
            {shadesFromBaseColor(baseColor).map(shade =>
              <UIColorSelectorOption
                key={shade}
                color={shade}
                onColorChange={onColorChange}
              />
            )}
          </div>
        )}
      </div>
      <div css={styles.customArea}>
        <div
          css={styles.colorSwatch}
          style={customTrimmed != null ? {background: `#${customTrimmed}`} : {}}
        />
        <input
          css={styles.customInput}
          type="text"
          value={custom != null ? '#' + custom : null}
          ref={inputRef}
          onChange={onCustomColorChanged}
          placeholder="#FFFFFF"
        />
      </div>
      <div style={{fontSize: '.8em', display: 'flex', gap: '10px', padding: '10px'}}>
        <UIButton
          style={{flexGrow: 1}}
          styling={Stylings.OUTLINE}
          onClick={onClose}>
          Cancel
        </UIButton>
        <UIButton
          style={{flexGrow: 1}}
          styling={Stylings.NOTIFY}
          onClick={() => onColorChange(customTrimmed)}>
          Change
        </UIButton>
      </div>
    </UIDropdown>
  </TetherComponent>;
};

export type UIColorSelectorProps = {
  value?: string;
  open: boolean;
  onColorChange: (value?: string) => void;
  children: React.ReactNode;
  onClose: () => void;
};

export default UIColorSelector;
