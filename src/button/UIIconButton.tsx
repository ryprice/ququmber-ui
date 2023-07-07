import {SerializedStyles} from '@emotion/react';
import {MutableRefObject, useCallback, useState, forwardRef} from 'react';
import TetherComponent from 'react-tether';

import Stylings from 'ququmber-ui/Stylings';
import useDelayedMouseHover from 'ququmber-ui/utils/useDelayedMouseHover';

const UIIconButton = forwardRef<HTMLSpanElement, UIIconButtonProps>((props: UIIconButtonProps, ref) => {
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

  const renderTooltip = (tetherRef: MutableRefObject<HTMLDivElement>) => (
    <div
      ref={tetherRef}
      style={{
        backgroundColor: 'rgb(40,40,40,.8)',
        color: '#ffffff',
        padding: '3px',
        borderRadius: '3px'
      }}>
      {tooltip}
    </div>
  );

  return <span ref={ref}>
    {button}
    {showTooltip && <TetherComponent
      attachment="top center"
      targetAttachment="bottom center"
      renderTarget={(tetherRef: MutableRefObject<HTMLDivElement>) => (
        <div ref={tetherRef} style={{height: 0}} />
      )}
      renderElement={renderTooltip}
    />}
  </span>;
});

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

export default UIIconButton;
