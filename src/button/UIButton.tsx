import * as React from 'react';
import TetherComponent from 'react-tether';

import UILoading from 'ququmber-ui/progress/UILoading';
import Stylings from 'ququmber-ui/Stylings';
import UIMountTransition from 'ququmber-ui/utils/UIMountTransition';
import useDelayedMouseHover from 'ququmber-ui/utils/useDelayedMouseHover';

const {useCallback, useState} = React;

const UIButton = React.forwardRef<HTMLButtonElement, UIButtonProps>((props, ref) => {
  const {className, onClick, children, style, styling, disabled, id, loading, tooltip} = props;
  const [showTooltip, setShowTooltip] = useState(false);

  const setShowTooltipIfEnabled = useCallback((v: boolean) => {
    return tooltip && setShowTooltip(v);
  }, [tooltip]);
  const [onMouseOver, onMouseOut] = useDelayedMouseHover(setShowTooltipIfEnabled, 300, 0);
  const buttonWithMaybeTooltipProps = tooltip ? {onMouseOver, onMouseOut} : {};

  const button = (
    <button
      ref={ref}
      className={`UIButton ${className != null ? className : ''} styling-${styling || Stylings.CONTROL}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
      id={id}
      {...buttonWithMaybeTooltipProps}
    >
      <span className="inner">{children}</span>
      {loading && (
        <div className="loadingContainer">
          <UILoading />
        </div>
      )}
    </button>
  );

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
});

export type UIButtonProps = {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  style?: object;
  styling?: Stylings;
  disabled?: boolean;
  id?: string;
  loading?: boolean;
  tooltip?: string;
};

export default UIButton;
