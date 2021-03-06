import * as React from 'react';
import {
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from 'react-live';

import Colors from 'ququmber-ui/Colors';
import Stylings from 'ququmber-ui/Stylings';

const defaultScope = {
  Colors,
  Stylings
};

const Editor = (props: EditorProps) => {
  return <div className="Editor">
    <LiveProvider
      code={props.code}
      scope={{...defaultScope, ...props.scope}}>
      <div className="renderContainer">
        <LiveError />
        <LivePreview />
      </div>
      <div className="codeContainer">
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
