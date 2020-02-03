import * as React from 'react';
import TetherComponent from 'react-tether';

import Stylings from 'ququmber-ui/Stylings';
import UIMountTransition from 'ququmber-ui/utils/UIMountTransition';
import useDelayedMouseHover from 'ququmber-ui/utils/useDelayedMouseHover';

const {useCallback, useState} = React;

const UIIconButton = (props: UIIconButtonProps) => {
  const {className, onClick, disabled, icon, tooltip, styling} = props;
  const [showTooltip, setShowTooltip] = useState(false);

  const setShowTooltipIfEnabled = useCallback((v: boolean) => tooltip && setShowTooltip(v), []);
  const [onMouseOver, onMouseOut] = useDelayedMouseHover(setShowTooltipIfEnabled, 300, 0);
  const buttonWithMaybeTooltipProps = tooltip ? {onMouseOver, onMouseOut} : {};

  const button = <button
    className={`UIIconButton styling-${styling} ${className}`}
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
  disabled: false,
  styling: Stylings.CONTROL,
};

export interface UIIconButtonProps {
  icon: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  tooltip?: string;
  styling?: Stylings;
}

export default class UIIconButtonClass extends React.Component<UIIconButtonProps> {
  render() {
    return <UIIconButton {...this.props} />;
  }
}
