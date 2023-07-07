import {useEffect, useState, ReactNode} from 'react';
import {CSSTransition} from 'react-transition-group';

const UIMountTransition = (props: UIMountTransitionProps) => {
  const {children, className} = props;
  const [mounted, setMounted] = useState(props.mounted);

  useEffect(() => setMounted(props.mounted), [props.mounted]);

  return <CSSTransition
    classNames={className}
    timeout={{enter: 200, exit: 200}}
    appear={true}>
    <>
      {mounted && children}
    </>
  </CSSTransition>;
};

export type UIMountTransitionProps = {
  mounted: boolean;
  className: string;
  children?: ReactNode;
};

export default UIMountTransition;
