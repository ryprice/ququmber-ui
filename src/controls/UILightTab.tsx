import * as React from 'react';

const UILightTab = (props: UILightTabProps) => {
  const {id, selected, onClick, name, className} = props;
  return <button
    className={`UILightTab ${selected ? 'selected' : ''} ${className || ''}`}
    key={id}
    onClick={() => onClick(id)}>
    {name}
  </button>;
};

type UILightTabProps = {
  name: React.ReactNode;
  id: string;
  onClick: (key: string) => void;
  selected: boolean;
  className?: string;
};

export default UILightTab;
