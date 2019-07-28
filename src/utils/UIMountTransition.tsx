import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const {useEffect, useState} = React;

const UIMountTransition = (props: UIMountTransitionProps) => {
  const {children, className} = props;
  const [mounted, setMounted] = useState(false);

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

export interface UIMountTransitionProps {
  mounted: boolean;
  className: string;
  children?: JSX.Element | JSX.Element[];
}

export default UIMountTransition;
