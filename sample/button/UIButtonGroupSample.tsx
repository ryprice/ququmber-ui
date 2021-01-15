import * as React from 'react';

import UIButtonGroup, {UIButtonGroupButton} from 'ququmber-ui/button/UIButtonGroup';
import Editor from '../Editor';

const UIButtonGroupSample = () =>
  <div>
    <Editor
      code={
`<div>
  <UIButtonGroup>
    <UIButtonGroupButton>Test</UIButtonGroupButton>
    <UIButtonGroupButton>Test2</UIButtonGroupButton>
  </UIButtonGroup>
</div>`
      }
      scope={{UIButtonGroup, UIButtonGroupButton}}
    />
  </div>;

export default UIButtonGroupSample;
