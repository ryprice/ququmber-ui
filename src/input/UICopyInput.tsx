import {SerializedStyles} from '@emotion/react';
import * as React from 'react';

import UIButton from 'ququmber-ui/button/UIButton';

const {useCallback, useRef} = React;

const UICopyInput = (props: UICopyInputProps) => {
  const {value, className, onCopy, css} = props;
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

  return <div css={css} className={`UICopyInput ${className || ''}`}>
    <input
      defaultValue={value}
      onClick={onCopyClick}
      ref={inputRef}
      onKeyPress={() => false}
      value={value}
    />
    <UIButton onClick={onCopyClick}>
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
  css?: SerializedStyles;
};

export default React.memo(UICopyInput);
