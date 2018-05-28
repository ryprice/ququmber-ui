import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDnd from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import UIBadge from 'ququmber-ui/controls/UIBadge';
import UIColorSelector from 'ququmber-ui/controls/UIColorSelector';
import UIEditableText from 'ququmber-ui/controls/UIEditableText';
import UITag from 'ququmber-ui/controls/UITag';
import UIMultiInput from 'ququmber-ui/controls/UIMultiInput';
import UIToggle from 'ququmber-ui/controls/UIToggle';
import UITextInput from 'ququmber-ui/controls/UITextInput';
import UIToastNotification, {Levels} from 'ququmber-ui/controls/UIToastNotification';
import UIToastNotificationArea from 'ququmber-ui/controls/uiToastNotificationArea';


import TaskFilterLink from 'ququmber-ui/tasks/TaskFilterLink';
import FuzzyTimeButton from 'ququmber-ui/fuzzyTime/FuzzyTimeButton';

import * as Colors from 'ququmber-ui/Colors';

import ComponentSection from './ComponentSection';

class RootComponent extends React.Component<{}, RootComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      toggleValue: true,
      curNav: null
    }
  }

  onNavClick(name) {
    this.setState({curNav: name});
  }

  render() {
    const {toggleValue} = this.state;

    const sections = [
      'Controls',
      ['UIColorSelector', <UIColorSelector
        onColorChanged={console.log}
        value={null}
      />],
      ['ququmber-ui/controls/UIEditableText', <UIEditableText
        placeholder="Enter your text here"
      />],
      ['UITag', <div>
        <UITag name="Shopping" canRemove={true} color="4286f4" />
        <UITag name="Work" canRemove={true} color="f4e242" />
        <UITag name="Sideproject" canRemove={true} color="b72924" />
        <UITag name="Untriaged" canRemove={true} color="238444" />
      </div>],
      ['ququmber-ui/controls/UIMultiInput', <UIMultiInput
        options={[
          {value: "1", name: "One"},
          {value: "2", name: "Two"},
          {value: "3", name: "Three"},
          {value: "3", name: "Four"}
        ]}
        selected={["1", "2"]}
        onOptionAdded={() => {}}
        onOptionRemoved={() => {}}
      />],
      ['ququmber-ui/controls/UIToggle', <UIToggle
        checked={toggleValue}
        onChange={value => this.setState({toggleValue: value})}
      />],
      ['ququmber-ui/controls/UITextInput', <UITextInput
        placeholder="Your name here"
      />],
      ['ququmber-ui/controls/UIToastNotification', <UIToastNotificationArea>
        <UIToastNotification
          level={Levels.WARNING}
          title="Warning"
          message="An error has occured."
        />
        <UIToastNotification
          level={Levels.WARNING}
          title="Warning"
          message="An error has occured."
        />
        <UIToastNotification
          level={Levels.WARNING}
          title="Warning"
          message="An error has occured."
        />
      </UIToastNotificationArea>],
      ['ququmber-ui/controls/UIBadge', <div>
        <UIBadge color={Colors.GO} text="Activated" />
        <UIBadge color={Colors.DISABLED} text="Disabled" />
      </div>],

      'FuzzyTime',
      ['ququmber-ui/fuzzyTime/FuzzyTimeButton', <FuzzyTimeButton />],

      'ququmber-api',
      ['ququmber-ui/tasks/TaskFilterLink', <TaskFilterLink
        href="http://google.com"
        onClick={() => alert('clicked list')}
        onDropTasks={(taskIds: number[]) => alert('tasks dropped')}>
        {"List of tasks"}
      </TaskFilterLink>]
    ];
    const curSection = sections[this.state.curNav];

    return <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{width: '200px', flexGrow: 0, flexShrink: 0}} className="sideNav">
        {sections.map((s, idx) => {
          if (typeof s === 'string') {
            return <p className="header">{s}</p>;
          } else {
            const pathParts = (s[0] as string).split('/');

            return <p><a
              onClick={() => this.onNavClick(idx)}>
              {pathParts[pathParts.length - 1]}
            </a></p>;
          }
        )}
      </div>

      <div style={{flexGrow: 1}}>
        {curSection ? <ComponentSection
          name={curSection[0] as string}>
          {curSection[1] as JSX.Element}
        </ComponentSection> : null}
      </div>
    </div>;
  }
}

interface RootComponentState {
  toggleValue: boolean;
  curNav: number;
}

const el = document.createElement('div');
document.querySelector('body').appendChild(el);
const DndRootComponent = ReactDnd.DragDropContext(HTML5Backend)(RootComponent);
ReactDOM.render(<DndRootComponent />, el);
