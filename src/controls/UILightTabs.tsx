import * as React from 'react';

import UILightTab from 'ququmber-ui/controls/UILightTab';

const {useState} = React;

const UILightTabs = (props: UILightTabsProps) => {
  const {tabs, defaultSelected} = props;
  const [stateSelected, setStateSelected] = useState(defaultSelected);
  const selected = props.selected || stateSelected;
  const selectedTabConfig = tabs.find(tab => tab.id === selected);
  return <div className="UILightTabs">
    <div className="tabs">
      {tabs.map(tab => <UILightTab
        selected={tab.id === selected}
        id={tab.id}
        key={tab.id}
        onClick={t => {
          setStateSelected(t);
          if (props.setSelected) {
            props.setSelected(t);
          }
        }}
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
  selected?: string;
  setSelected?: (id: string) => void;
};

export default UILightTabs;
