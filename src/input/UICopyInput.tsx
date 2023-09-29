import {css} from '@emotion/react';
import * as Color from 'color';
import * as React from 'react';
import {useRef, useCallback} from 'react';

import UIButton from 'ququmber-ui/button/UIButton';
import Colors from 'ququmber-ui/Colors';

const styles = {
  root: css`
    margin: 1em 0;
    display: flex;

    input {
      padding-left: 10px;
      border-radius: .25em;
      border: solid ${Color(Colors.CONTROL).darken(.2).hex()} 1px;
      flex-grow: 1;
      border-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      background: ${Colors.WHITE};
    }
  `,
  copyButton: css`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin: 0;
  `
};

const UICopyInput = (props: UICopyInputProps) => {
  const {value, className, onCopy} = props;
  const inputRef = useRef<HTMLInputElement>();

  const onCopyClick = useCallback(() => {
    const inputEl = inputRef.current;
    if (inputEl) {
      inputEl.focus();
      inputEl.setSelectionRange(0, value ? value.length : 0);
      document.execCommand('copy');
    }
    if (onCopy) {
      onCopy();
    }
  }, [value, onCopy]);

  return <div css={styles.root} className={className}>
    <input
      defaultValue={value}
      onClick={onCopyClick}
      ref={inputRef}
      onKeyPress={() => false}
      value={value}
    />
    <UIButton css={styles.copyButton} onClick={onCopyClick}>
      <i className="far fa-clipboard" />
      &nbsp;
      Copy
    </UIButton>
  </div>;
};

export type UICopyInputProps = {
  value?: string;
  className?: string;
  onCopy?: () => void;
};

export default React.memo(UICopyInput);
