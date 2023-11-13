import {css} from '@emotion/react';
import {useRef, useState, CSSProperties} from 'react';

import UIButton from 'ququmber-ui/button/UIButton';
import Colors from 'ququmber-ui/Colors';
import UITooltip from 'ququmber-ui/popup/UITooltip';
import Stylings from 'ququmber-ui/Stylings';

const styles = {
  textarea: css`
    backgroun: ${Colors.WHITE};
    width: 100%;
    resize: vertical;
    font-family: arial;
    box-sizing: border-box;
    margin-top: 0;
    min-height: 60px;

    && {
      border: 1px solid ${Colors.SILENT};
      background: transparent;
    }
  `,
  buttonContainer: css`
    display: flex;
    flex-direction: row;
    gap: .5em;
    margin-top: .3em;
    align-items: center;
  `,
  button: css`
    && {
      font-size: .8em;
      margin: 0;
    }
  `
};

type UITextAreaProps = {
  value?: string;
  readonly: boolean;
  onPersistValue: (nextValue: string) => Promise<{clearText?: boolean}>;
  onCancel?: () => {clearText?: boolean};
  placeholder?: string;
  submitText?: string;
  className?: string;
  style?: CSSProperties;
  autofocus?: boolean;
  validateValue?: (value: string) => void;
  supportsMarkdown?: boolean;
};

const UITextArea = (props: UITextAreaProps) => {
  const {
    readonly, onPersistValue, placeholder, submitText, value,
    className, style, validateValue, autofocus, supportsMarkdown
  } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showSubmit, setShowSubmit] = useState(true);
  const [saving, setSaving] = useState(false);
  const [markdownTooltipOpen, setMarkdownTooltipOpen] = useState(false);

  const clearText = () => {
    textareaRef.current.value = '';
    setShowSubmit(false);
  };

  const onCancel = () => {
    const result = props.onCancel();
    if (result.clearText) {
      clearText();
    }
  };

  const onSubmit = async () => {
    setSaving(true);
    const result = await onPersistValue(textareaRef.current.value);
    setSaving(false);
    if (result.clearText) {
      clearText();
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (readonly) {
      return;
    }
    if (e.charCode === 13 && !e.shiftKey) {
      onSubmit().catch(console.error);
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  return <div className={className} style={style}>
    <textarea
      onChange={(e) => validateValue != null && validateValue(e.target.value)}
      css={styles.textarea}
      placeholder={placeholder}
      ref={textareaRef}
      onKeyPress={onKeyPress}
      readOnly={readonly || saving}
      defaultValue={value}
      autoFocus={autofocus}
    />
    {(
      <div css={styles.buttonContainer}>
        {supportsMarkdown && <UITooltip
          text="Markdown is supported."
          renderTarget={(ref: React.MutableRefObject<HTMLElement>) =>
            <i
              ref={ref}
              className="fab fa-markdown"
              style={{color: Colors.QUIET}}
              onClick={() => setMarkdownTooltipOpen(!markdownTooltipOpen)}
            />
          }
          open={markdownTooltipOpen}
          onClose={() => setMarkdownTooltipOpen(false)}
        />}
        <div style={{flexGrow: 1}} />
        {props.onCancel != null && <UIButton
          css={styles.button}
          style={{visibility: showSubmit ? 'visible' : 'hidden'}}
          styling={Stylings.LINK}
          onClick={onCancel}>
          Cancel
        </UIButton>}
        <UIButton
          css={styles.button}
          style={{visibility: showSubmit ? 'visible' : 'hidden'}}
          styling={Stylings.NOTIFY}
          onClick={onSubmit}
          loading={saving}>
          {submitText || 'Submit'}
        </UIButton>
      </div>
    )}
  </div>;
};

export default UITextArea;
