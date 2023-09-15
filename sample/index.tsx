import {useCallback, useEffect, useState} from 'react';
import {DndProvider} from 'react-dnd';
import {css} from '@emotion/react';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {createRoot} from 'react-dom/client';

import UIBadge from 'ququmber-ui/chip/UIBadge';
import Colors from 'ququmber-ui/Colors';
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

import UIBigButtonSample from './button/UIBigButtonSample';
import UIButtonSample from './button/UIButtonSample';
import UIButtonGroupSample from './button/UIButtonGroupSample';
import UIDropdownButtonSample from './button/UIDropdownButtonSample';
import UIIconButtonSample from './button/UIIconButtonSample';

import UIColorSelectorSample from './controls/UIColorSelectorSample';
import UITagSample from './chip/UITagSample';
import UIToggleSample from './controls/UIToggleSample';

import FuzzyTimeSelectSample from './fuzzyTime/FuzzyTimeSelectSample';

import UIMultiInputSample from './input/UIMultiInputSample';
import UISelectSample from './input/UISelectSample';

import UIMessageModalSample from './popup/UIMessageModalSample';
import UIPopupSample from './popup/UIPopupSample';
import UITooltipSample from './popup/UITooltipSample';

import ShimmerSample from './progress/ShimmerSample';
import UIProgressBarSample from './progress/UIProgressBarSample';

import SideNav, {SideNavSectionConfig} from './SideNav';

const styles = {
  mainContent: css`
    display: flex;
    flex-direction: row;
    top: 40px;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
  `,
  topbar: css`
    background: ${Colors.QUQUMBER};
    width: 100%;
    height: 40px;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    color: ${Colors.BASEFONT_DARK};
    display: flex;

    #logo {
      height: 24px;
      float: left;
      flex-shrink: 0;
      margin-top: 8px;
      margin-left: 18px;
      margin-right: 0;
      opacity: 0.8;

      &:hover {
        opacity: 0.6;
      }
    }
  `,
};

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
  const sections: SideNavSectionConfig = [
    'Chips',
    ['ququmber-ui/chip/UITag', <UITagSample />],
    ['ququmber-ui/chip/UIBadge', <div>
      <UIBadge color={Colors.GO} text="Activated" />
      &nbsp;&nbsp;
      <UIBadge color={Colors.DISABLED} text="Disabled" />
    </div>],

    'Controls',
    ['ququmber-ui/controls/UIColorSelector', <UIColorSelectorSample />],
    ['ququmber-ui/controls/UIToggle', <UIToggleSample />],
    ['ququmber-ui/controls/UICheckbox', <UICheckbox />],

    'Input',
    ['ququmber-ui/input/UICopyInput', <UICopyInput
      value="https://app.listlab.io/t/1839483?s=7d92kd0mc283mns0yu44j"
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
    ['ququmber-ui/button/UIIconButton', <UIIconButtonSample />],
    ['ququmber-ui/button/UIBigButton', <UIBigButtonSample />],
    ['ququmber-ui/button/UIButtonGroup', <UIButtonGroupSample />],
    ['ququmber-ui/button/UIDropdownButton', <UIDropdownButtonSample />],

    'FuzzyTime',
    ['ququmber-ui/fuzzyTime/FuzzyTimeButton', <FuzzyTimeButton />],
    ['ququmber-ui/fuzzyTime/FuzzyTimeSelect', <FuzzyTimeSelectSample />],

    'Alerts',
    ['ququmber-ui/alerts/UIBanner', <UIBannerSample />],
    ['ququmber-ui/alerts/UIToastNotification', <UIToastNotificationSample />],

    'Progress',
    ['ququmber-ui/progress/UIProgressBar', <UIProgressBarSample />],
    ['ququmber-ui/progress/UIShimmerRect', <ShimmerSample />],

    'Styles',
    ['ququmber-ui/Colors', <ColorsSection />],
    ['ququmber-ui/Typography', <TypographySection />],
    ['Sample-form', <FormSection />],

    'listlab-api',
    ['ququmber-ui/tasks/TaskFilterLink', <TaskFilterLink
      href="http://google.com"
      onClick={() => alert('clicked list')}>
      {'List of tasks'}
    </TaskFilterLink>]
  ];
  /* eslint-enable react/jsx-key */

  const curSection = sections.find(s => s[0] === curNav);

  const [filter, setFilter] = useState<string>(null);
  const onFilterKeyPress = useCallback((nextFilter: string) => {
    if (nextFilter != null && nextFilter.length > 0) {
      setFilter(nextFilter);
    } else {
      setFilter(null);
    }
    return true;
  }, [setFilter]);

  const filteredSections = sections.filter(s => {
    if (filter == null) {
      return true;
    }
    if (typeof s === 'string') {
      return false;
    }
    const pathParts = (s[0] as string).split('/');
    return pathParts[pathParts.length - 1]
      .toLocaleLowerCase()
      .includes(filter.toLocaleLowerCase());
  });

  return <div>
    <div css={styles.topbar}>
      <img id="logo" src="https://static.listlab.io/images/logo-white.svg" />
    </div>
    <div css={styles.mainContent}>
      <SideNav sections={filteredSections} onFilterKeyPress={onFilterKeyPress} />
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
const reactRoot = createRoot(el);
reactRoot.render(
  <DndProvider backend={HTML5Backend}>
    <RootComponent />
  </DndProvider>
);
