import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDnd from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import UIColorSelector from 'ququmber-ui/controls/UIColorSelector';
import UIEditableText from 'ququmber-ui/controls/UIEditableText';
import UITag from 'ququmber-ui/controls/UITag';
import UIMultiInput from 'ququmber-ui/controls/UIMultiInput';
import UIToggle from 'ququmber-ui/controls/UIToggle';
import UITextInput from 'ququmber-ui/controls/UITextInput';

import TaskFilterLink from 'ququmber-ui/tasks/TaskFilterLink';

import FuzzyTimeButton from 'ququmber-ui/fuzzyTime/FuzzyTimeButton';

class RootComponent extends React.Component<{}, RootComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      toggleValue: true
    }
  }

  render() {
    const {toggleValue} = this.state;

    return <div>
      <UIColorSelector
        onColorChanged={console.log}
        value={null}
      />
      <UIEditableText placeholder="Enter your text here" />
      <div style={{margin: '10px 0px'}}>
        <UITag name="Shopping" canRemove={true} color="4286f4" />
        <UITag name="Work" canRemove={true} color="f4e242" />
        <UITag name="Sideproject" canRemove={true} color="b72924" />
        <UITag name="Untriaged" canRemove={true} color="238444" />
      </div>
      <UIMultiInput
        options={[
          {value: "1", name: "One"},
          {value: "2", name: "Two"},
          {value: "3", name: "Three"},
          {value: "3", name: "Four"}
        ]}
        selected={["1", "2"]}
        onOptionAdded={() => {}}
        onOptionRemoved={() => {}}
      />
      <UIToggle
        checked={toggleValue}
        onChange={value => this.setState({toggleValue: value})}
      />
      <UITextInput
        placeholder="Your name here"
      />
      <FuzzyTimeButton />
      <TaskFilterLink
        href="http://google.com"
        onClick={() => alert('clicked list')}
        onDropTasks={(taskIds: number[]) => alert('tasks dropped')}>
        {"List of tasks"}
      </TaskFilterLink>
    </div>;
  }
}

interface RootComponentState {
  toggleValue: boolean;
}

const el = document.createElement('div');
document.querySelector('body').appendChild(el);
const DndRootComponent = ReactDnd.DragDropContext(HTML5Backend)(RootComponent);
ReactDOM.render(<DndRootComponent />, el);
