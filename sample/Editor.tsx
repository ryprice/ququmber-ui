import {
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from 'react-live';

import Colors from 'ququmber-ui/Colors';
import Stylings from 'ququmber-ui/Stylings';
import {css} from '@emotion/react';

const defaultScope = {
  Colors,
  Stylings
};

const styles = {
  root: css`
    display: flex;
    flex-direction: row;
    border: ${Colors.SILENT} 1px solid;
    overflow: hidden;
    border-radius: 6px;
  `,
  renderContainer: css`
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    padding: 10px;
    background: ${Colors.WHITE};
  `,
  codeContainer: css`
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    margin-left: 10px;
    background: #383838;
    caret-color: ${Colors.WHITE};

    &:hover {
      background: #222222;
    }
  `,
};

const Editor = (props: EditorProps) => {
  return <div css={styles.root}>
    <LiveProvider
      code={props.code}
      scope={{...defaultScope, ...props.scope}}>
      <div css={styles.renderContainer}>
        <LiveError />
        <LivePreview />
      </div>
      <div css={styles.codeContainer}>
        <LiveEditor />
      </div>
    </LiveProvider>
  </div>;
};

type EditorProps = {
  code: string;
  scope?: any;
};

export default Editor;
