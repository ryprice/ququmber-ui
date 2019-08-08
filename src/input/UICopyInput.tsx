import * as React from 'react';

import UIButton from 'ququmber-ui/button/UIButton';

const {useCallback, useRef} = React;

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

  return <div className="UICopyInput">
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

export interface UICopyInputProps {
  value?: string;
  className?: string;
  onCopy?: () => void;
}

export default React.memo(UICopyInput);
