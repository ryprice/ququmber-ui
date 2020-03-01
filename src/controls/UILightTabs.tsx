import * as React from 'react';

import UILightTab from 'ququmber-ui/controls/UILightTab';

const {useState} = React;

const UILightTabs = (props: UILightTabsProps) => {
  const {tabs, defaultSelected} = props;
  const [selectedTab, setSelectedTab] = useState(defaultSelected);
  const selectedTabConfig = tabs.find(tab => tab.id === selectedTab);
  return <div className="UILightTabs">
    <div className="tabs">
      {tabs.map(tab => <UILightTab
        selected={tab.id === selectedTab}
        id={tab.id}
        key={tab.id}
        onClick={setSelectedTab}
        name={tab.name}
      />)}
    </div>
    {selectedTabConfig && selectedTabConfig.component}
  </div>;
};

type UILightTabTabConfig = {
  name: string;
  component: React.ReactNode;
  id: string;
};

type UILightTabsProps = {
  tabs: UILightTabTabConfig[];
  defaultSelected: string;
};

export default UILightTabs;