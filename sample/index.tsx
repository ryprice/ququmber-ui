import * as React from 'react';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as ReactDOM from 'react-dom';

import Colors from 'ququmber-ui/Colors';
import UIBadge from 'ququmber-ui/controls/UIBadge';
import UICheckbox from 'ququmber-ui/controls/UICheckbox';
import UICopyInput from 'ququmber-ui/input/UICopyInput';
import UIEditableText from 'ququmber-ui/input/UIEditableText';
import UITextInput from 'ququmber-ui/input/UITextInput';

import FuzzyTimeButton from 'ququmber-ui/fuzzyTime/FuzzyTimeButton';

import TaskFilterLink from 'ququmber-ui/tasks/TaskFilterLink';

import ColorsSection from './ColorsSection';
import ComponentSection from './ComponentSection';
import FormSection from './FormSection';
import TypographySection from './TypographySection';

import UIBannerSample from './alerts/UIBannerSample';
import UIToastNotificationSample from './alerts/UIToastNotificationSample';

import UIButtonSample from './button/UIButtonSample';
import UIDropdownButtonSample from './button/UIDropdownButtonSample';
import UIIconButtonSample from './button/UIIconButtonSample';

import UIColorSelectorSample from './controls/UIColorSelectorSample';
import UITagSample from './controls/UITagSample';
import UIToggleSample from './controls/UIToggleSample';

import FuzzyTimeSelectSample from './fuzzyTime/FuzzyTimeSelectSample';

import UIMultiInputSample from './input/UIMultiInputSample';
import UISelectSample from './input/UISelectSample';

import UIMessageModalSample from './popup/UIMessageModalSample';
import UIPopupSample from './popup/UIPopupSample';
import UITooltipSample from './popup/UITooltipSample';

const {useCallback, useEffect, useState} = React;

const RootComponent = () => {
  const [curNav, setCurNav] = useState<string>();

  const onHashChange = () => {
    const path = window.location.hash.substr(1, window.location.hash.length);
    setCurNav(path);
  };

  useEffect(() => {
    window.addEventListener('hashchange', onHashChange, false);
    onHashChange();
  }, []);

  /* eslint-disable react/jsx-key */
  const sections = [
    'Controls',
    ['ququmber-ui/controls/UIColorSelector', <UIColorSelectorSample />],
    ['ququmber-ui/controls/UITag', <UITagSample />],
    ['ququmber-ui/controls/UIToggle', <UIToggleSample />],
    ['ququmber-ui/controls/UICheckbox', <UICheckbox />],
    ['ququmber-ui/controls/UIBadge', <div>
      <UIBadge color={Colors.GO} text="Activated" />
      &nbsp;&nbsp;
      <UIBadge color={Colors.DISABLED} text="Disabled" />
    </div>],

    'Input',
    ['ququmber-ui/input/UICopyInput', <UICopyInput
      value="http://app.listlab.io/t/1839483?s=7d92kd0mc283mns0yu44j"
    />],
    ['ququmber-ui/input/UIEditableText', <UIEditableText
      placeholder="Enter your text here"
    />],
    ['ququmber-ui/input/UIMultiInput', <UIMultiInputSample />],
    ['ququmber-ui/input/UITextInput', <UITextInput
      placeholder="Your name here"
    />],
    ['ququmber-ui/input/UISelect', <UISelectSample />],

    'Popup',
    ['ququmber-ui/popup/UIMessageModal', <UIMessageModalSample />],
    ['ququmber-ui/popup/UITooltip', <UITooltipSample />],
    ['ququmber-ui/popup/UIPopup', <UIPopupSample />],

    'Button',
    ['ququmber-ui/button/UIButton', <UIButtonSample />],
    ['ququmber-ui/button/UIDropdownButton', <UIDropdownButtonSample />],
    ['ququmber-ui/button/UIIconButton', <UIIconButtonSample />],

    'FuzzyTime',
    ['ququmber-ui/fuzzyTime/FuzzyTimeButton', <FuzzyTimeButton />],
    ['ququmber-ui/fuzzyTime/FuzzyTimeSelect', <FuzzyTimeSelectSample />],

    'Alerts',
    ['ququmber-ui/alerts/UIBanner', <UIBannerSample />],
    ['ququmber-ui/alerts/UIToastNotification', <UIToastNotificationSample />],

    'Styles',
    ['ququmber-ui/Colors', <ColorsSection />],
    ['ququmber-ui/Typography', <TypographySection />],
    ['Sample-form', <FormSection />],

    'listlab-api',
    ['ququmber-ui/tasks/TaskFilterLink', <TaskFilterLink
      href="http://google.com"
      onClick={() => alert('clicked list')}
      onDropTasks={(taskIds: number[]) => alert('tasks dropped')}>
      {'List of tasks'}
    </TaskFilterLink>]
  ];
  /* eslint-enable react/jsx-key */

  const curSection = sections.find(s => s[0] === curNav);

  const [filter, setFilter] = useState<string>(null);
  const onFilterKeyPress = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFilter = event.target.value;
    if (nextFilter != null && nextFilter.length > 0) {
      setFilter(nextFilter);
    } else {
      setFilter(null);
    }
    return true;
  }, [setFilter, filter]);

  const filteredSections = sections.filter(s => {
    if (filter != null && typeof s !== 'string') {
      const pathParts = (s[0] as string).split('/');
      return pathParts[pathParts.length - 1]
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase());
    }
    return true;
  });

  return <div>
    <div className="Topbar">
      <div id="logo" />
    </div>
    <div className="mainContent">
      <div className="sideNav">
        <UITextInput placeholder="filter" onChange={onFilterKeyPress} />
        {filteredSections.map((s, idx) => {
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
          {curSection[1] as React.ReactChild}
        </ComponentSection> : null}
      </div>
    </div>
  </div>;
};

const el = document.createElement('div');
document.querySelector('body').appendChild(el);
ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <RootComponent />
  </DndProvider>,
  el
);
