import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const {useEffect, useState} = React;

const UIMountTransition = (props: UIMountTransitionProps) => {
  const {children, className} = props;
  const [mounted, setMounted] = useState(props.mounted);

  useEffect(() => setMounted(props.mounted), [props.mounted]);

  return <ReactCSSTransitionGroup
    transitionName={className}
    transitionEnterTimeout={200}
    transitionLeaveTimeout={200}
    transitionAppearTimeout={200}
    transitionAppear={true}>
    {mounted && children}
  </ReactCSSTransitionGroup>;
};

export type UIMountTransitionProps = {
  mounted: boolean;
  className: string;
  children?: React.ReactNode;
};

export default UIMountTransition;
