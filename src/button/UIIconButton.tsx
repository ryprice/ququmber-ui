import {SerializedStyles} from '@emotion/react';
import * as React from 'react';
import TetherComponent from 'react-tether';

import Stylings from 'ququmber-ui/Stylings';
import useDelayedMouseHover from 'ququmber-ui/utils/useDelayedMouseHover';

const {useCallback, useState} = React;

const UIIconButton = (props: UIIconButtonProps) => {
  const {className, onClick, disabled, icon, styling, style, css, tooltip} = props;
  const [showTooltip ,setShowTooltip] = useState(false);

  const setShowTooltipIfEnabled = useCallback((v: boolean) => {
    return tooltip && setShowTooltip(v);
  }, [tooltip]);
  const [onMouseOver, onMouseOut] = useDelayedMouseHover(setShowTooltipIfEnabled, 300, 0);
  const buttonWithMaybeTooltipProps = tooltip ? {onMouseOver, onMouseOut} : {};
  const button = <button
    style={style}
    css={css}
    className={`UIIconButton styling-${styling} ${className}`}
    onClick={onClick}
    disabled={disabled}
    {...buttonWithMaybeTooltipProps}>
    <i className={icon} />
  </button>;

  return <span>
    {button}
    {showTooltip && <TetherComponent
      attachment="top center"
      targetAttachment="bottom center">
      <div style={{height: 0}}></div>
      <div style={{
        backgroundColor: 'rgb(40,40,40,.8)',
        color: '#ffffff',
        padding: '3px',
        borderRadius: '3px'
      }}>{tooltip}</div>
    </TetherComponent>}
  </span>;
};


UIIconButton.defaultProps = {
  className: '',
  disabled: false,
  styling: Stylings.CONTROL,
};

export type UIIconButtonProps = {
  icon: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  tooltip?: string;
  styling?: Stylings;
  style?: object;
  css?: SerializedStyles;
};

export default class UIIconButtonClass extends React.Component<UIIconButtonProps> {
  render() {
    return <UIIconButton {...this.props} />;
  }
}
