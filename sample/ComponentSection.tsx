const ComponentSection = (props: ComponentSectionProps) => {
  return <div className="componentSection">
    <h1 className="componentTitle">{props.name}</h1>
    <div className="componentWell">
      {props.children}
    </div>
  </div>;
};

type ComponentSectionProps = {
  name: string;
  children: React.ReactNode;
};

export default ComponentSection;
