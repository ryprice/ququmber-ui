import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDnd from "react-dnd";

import {UIColorSelector} from 'ququmber-ui/controls/UIColorSelector';

class RootComponent extends React.Component<{}, {}> {
  render() {
    return <div>
      <UIColorSelector
        onColorChanged={console.log}
        value={null}
      />
    </div>;
  }
}
console.log(UIColorSelector);
const el = document.createElement('div');
document.querySelector('body').appendChild(el);
ReactDOM.render(<RootComponent />, el);
