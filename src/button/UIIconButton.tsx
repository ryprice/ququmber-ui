import * as React from 'react';
import TetherComponent from 'react-tether';

import UIMountTransition from 'ququmber-ui/utils/UIMountTransition';
import useDelayedMouseHover from 'ququmber-ui/utils/useDelayedMouseHover';

const {useState} = React;

const UIIconButton = (props: UIIconButtonProps) => {
  const {className, onClick, disabled, icon, tooltip} = props;
  const [showTooltip, setShowTooltip] = useState(false);

  const [onMouseOver, onMouseOut] = useDelayedMouseHover(setShowTooltip, 300, 0);
  const buttonWithMaybeTooltipProps = tooltip ? {onMouseOver, onMouseOut} : {};

  const button = <button
    className={`UIIconButton ${className}`}
    onClick={onClick}
    disabled={disabled}
    {...buttonWithMaybeTooltipProps}>
    <i className={icon} />
  </button>;

  if (!showTooltip) {
    return button;
  }

  return <TetherComponent
    attachment="top center"
    targetAttachment="bottom center">
    {button}
    <UIMountTransition mounted={true} className="UIIconButtonTransition">
      <div style={{
        backgroundColor: 'rgb(40,40,40,.8)',
        color: '#ffffff',
        padding: '3px',
        borderRadius: '3px'
      }}>{tooltip}</div>
    </UIMountTransition>
  </TetherComponent>;
};


UIIconButton.defaultProps = {
  className: '',
  disabled: false
};

export interface UIIconButtonProps {
  icon: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  tooltip?: string;
}

export default UIIconButton;
