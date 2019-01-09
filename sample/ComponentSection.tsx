import * as React from 'react';

const ComponentSection = (props: ComponentSectionProps) => {
  return <div className="componentSection">
    <h1 className="componentTitle">{props.name}</h1>
    <div className="componentWell">
      {props.children}
    </div>
  </div>;
};

interface ComponentSectionProps {
  name: string;
  children: JSX.Element | JSX.Element[];
}

export default ComponentSection;
