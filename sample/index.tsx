import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDnd from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import * as Colors from 'ququmber-ui/Colors';
import UIBadge from 'ququmber-ui/controls/UIBadge';
import UIButton from 'ququmber-ui/controls/UIButton';
import UIColorSelector from 'ququmber-ui/controls/UIColorSelector';
import UIEditableText from 'ququmber-ui/controls/UIEditableText';
import UIIndeterminateCheckbox from 'ququmber-ui/controls/UIIndeterminateCheckbox';
import UITag from 'ququmber-ui/controls/UITag';
import UIMultiInput from 'ququmber-ui/controls/UIMultiInput';
import UITextInput from 'ququmber-ui/controls/UITextInput';

import TaskFilterLink from 'ququmber-ui/tasks/TaskFilterLink';
import FuzzyTimeButton from 'ququmber-ui/fuzzyTime/FuzzyTimeButton';

import ColorsSection from './ColorsSection';
import ComponentSection from './ComponentSection';
import FormSection from './FormSection';
import TypographySection from './TypographySection';

import UIMessageModalSample from './controls/UIMessageModalSample';
import UIToastNotificationSample from './controls/UIToastNotificationSample';
import UIToggleSample from './controls/UIToggleSample';

class RootComponent extends React.Component<{}, RootComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = {curNav: null};

    window.addEventListener(
      "hashchange",
      () => this.onHashChange(),
      false
    );
  }

  componentDidMount() {
    this.onHashChange();
  }

  onHashChange() {
    const path = window.location.hash.substr(1, window.location.hash.length);
    this.setState({curNav: path});
  }

  render() {
    const sections = [
      'Controls',
      ['ququmber-ui/controls/UIColorSelector', <UIColorSelector
        onColorChanged={console.log}
        value={null}
      />],
      ['ququmber-ui/controls/UIEditableText', <UIEditableText
        placeholder="Enter your text here"
      />],
      ['ququmber-ui/controls/UITag', <div>
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
      ['ququmber-ui/controls/UIIndeterminateCheckbox', <UIIndeterminateCheckbox
        onChange={() => {}}
      />],
      ['ququmber-ui/controls/UIToggle', <UIToggleSample />],
      ['ququmber-ui/controls/UITextInput', <UITextInput
        placeholder="Your name here"
      />],
      ['ququmber-ui/controls/UIToastNotification', <UIToastNotificationSample />],
      ['ququmber-ui/controls/UIBadge', <div>
        <UIBadge color={Colors.GO} text="Activated" />
        &nbsp;&nbsp;
        <UIBadge color={Colors.DISABLED} text="Disabled" />
      </div>],
      ['ququmber-ui/controls/UIMessageModal', <UIMessageModalSample />],
      ['ququmber-ui/controls/UIButton', <div>
        <UIButton style={{width: '200px'}}>Default Color</UIButton><br />
        <UIButton style={{width: '200px'}} color="go">Go</UIButton><br />
        <UIButton style={{width: '200px'}} color="facebook">Facebook</UIButton><br />
        <UIButton style={{width: '200px'}} color="google">Google</UIButton><br />
      </div>],

      'FuzzyTime',
      ['ququmber-ui/fuzzyTime/FuzzyTimeButton', <FuzzyTimeButton />],

      'Styles',
      ['ququmber-ui/Colors', <ColorsSection />],
      ['ququmber-ui/Typography', <TypographySection />],
      ['Sample-form', <FormSection />],

      'ququmber-api',
      ['ququmber-ui/tasks/TaskFilterLink', <TaskFilterLink
        href="http://google.com"
        onClick={() => alert('clicked list')}
        onDropTasks={(taskIds: number[]) => alert('tasks dropped')}>
        {"List of tasks"}
      </TaskFilterLink>]
    ];

    const curSection = sections.find(s => s[0] === this.state.curNav);

    return <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{width: '200px', flexGrow: 0, flexShrink: 0}} className="sideNav">
        {sections.map((s, idx) => {
          if (typeof s === 'string') {
            return <p className="header">{s}</p>;
          } else {
            const pathParts = (s[0] as string).split('/');

            return <p><a href={`#${s[0]}`}>
              {pathParts[pathParts.length - 1]}
            </a></p>;
          }
        })}
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
  curNav: string;
}

const el = document.createElement('div');
document.querySelector('body').appendChild(el);
const DndRootComponent = ReactDnd.DragDropContext(HTML5Backend)(RootComponent);
ReactDOM.render(<DndRootComponent />, el);
