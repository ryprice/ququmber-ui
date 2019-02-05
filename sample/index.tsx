import * as React from 'react';
import * as ReactDnd from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as ReactDOM from 'react-dom';

import {FuzzyGranularity, FuzzyTime, FuzzyTimeRange} from 'ququmber-api';

import UIIconButton from 'ququmber-ui/button/UIIconButton';
import Colors from 'ququmber-ui/Colors';
import UIBadge from 'ququmber-ui/controls/UIBadge';
import UIColorSelector from 'ququmber-ui/controls/UIColorSelector';
import UIEditableText from 'ququmber-ui/controls/UIEditableText';
import UIIndeterminateCheckbox from 'ququmber-ui/controls/UIIndeterminateCheckbox';
import UIMultiInput from 'ququmber-ui/controls/UIMultiInput';
import UITag from 'ququmber-ui/controls/UITag';
import UITextInput from 'ququmber-ui/controls/UITextInput';

import FuzzyTimeButton from 'ququmber-ui/fuzzyTime/FuzzyTimeButton';

import TaskFilterLink from 'ququmber-ui/tasks/TaskFilterLink';

import ColorsSection from './ColorsSection';
import ComponentSection from './ComponentSection';
import FormSection from './FormSection';
import TypographySection from './TypographySection';

import UIButtonSample from './button/UIButtonSample';
import UITagSample from './controls/UITagSample';
import UIToastNotificationSample from './controls/UIToastNotificationSample';
import UIToggleSample from './controls/UIToggleSample';

import FuzzyTimeSelectSample from './fuzzyTime/FuzzyTimeSelectSample';

import UIMessageModalSample from './popup/UIMessageModalSample';
import UIPopupSample from './popup/UIPopupSample';
import UITooltipSample from './popup/UITooltipSample';

class RootComponent extends React.Component<{}, RootComponentState> {

  readonly state: RootComponentState = {
    curNav: null
  };

  componentDidMount() {
    window.addEventListener(
      'hashchange',
      () => this.onHashChange(),
      false
    );

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
        onColorChanged={() => {}}
        value={null}
      />],
      ['ququmber-ui/controls/UIEditableText', <UIEditableText
        placeholder="Enter your text here"
      />],
      ['ququmber-ui/controls/UITag', <UITagSample />],
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

      'Popup',
      ['ququmber-ui/popup/UIMessageModal', <UIMessageModalSample />],
      ['ququmber-ui/popup/UITooltip', <UITooltipSample />],
      ['ququmber-ui/popup/UIPopup', <UIPopupSample />],

      'Button',
      ['ququmber-ui/button/UIButton', <UIButtonSample />],
      ['ququmber-ui/button/UIIconButton', <div>
        <UIIconButton icon="fa fa-inbox" /><br />
        <div style={{fontSize: '20px'}}><UIIconButton icon="fa fa-inbox" /></div><br />
      </div>],

      'FuzzyTime',
      ['ququmber-ui/fuzzyTime/FuzzyTimeButton', <FuzzyTimeButton />],
      ['ququmber-ui/fuzzyTime/FuzzyTimeSelect', <FuzzyTimeSelectSample />],

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

    return <div>
      <div className="topbar">
        <div id="logo" />
      </div>
      <div className="mainContent">
        <div className="sideNav">
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
