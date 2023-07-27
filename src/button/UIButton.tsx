import {useCallback, useState, MutableRefObject, forwardRef} from 'react';
import {mergeRefs} from 'react-merge-refs';
import TetherComponent from 'react-tether';

import Colors from 'ququmber-ui/Colors';
import UILoading from 'ququmber-ui/progress/UILoading';
import Stylings from 'ququmber-ui/Stylings';
import UIMountTransition from 'ququmber-ui/utils/UIMountTransition';
import useDelayedMouseHover from 'ququmber-ui/utils/useDelayedMouseHover';

const UIButton = forwardRef<HTMLButtonElement, UIButtonProps>((props, ref) => {
  const {className, onClick, children, style, styling, disabled, id, loading, tooltip} = props;
  const [showTooltip, setShowTooltip] = useState(false);

  const setShowTooltipIfEnabled = useCallback((v: boolean) => {
    return tooltip && setShowTooltip(v);
  }, [tooltip]);
  const [onMouseOver, onMouseOut] = useDelayedMouseHover(setShowTooltipIfEnabled, 300, 0);
  const buttonWithMaybeTooltipProps = tooltip ? {onMouseOver, onMouseOut} : {};

  const darkSpinner = (
    styling == null ||
    [Stylings.CONTROL, Stylings.FLAT, Stylings.OUTLINE, Stylings.MATTE].includes(styling)
  );

  const renderButton = (tetherRef: MutableRefObject<HTMLButtonElement>) => (
    <button
      ref={mergeRefs([ref, tetherRef])}
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
          <UILoading {...(darkSpinner ? {color: Colors.BASEFONT} : {})} />
        </div>
      )}
    </button>
  );

  if (!showTooltip) {
    return renderButton(null);
  }

  const renderTooltip = (tetherRef: MutableRefObject<HTMLDivElement>) => (
    <UIMountTransition mounted={true} className="UIIconButtonTransition">
      <div ref={tetherRef} style={{
        backgroundColor: 'rgb(40,40,40,.8)',
        color: '#ffffff',
        padding: '3px',
        borderRadius: '3px'
      }}>{tooltip}</div>
    </UIMountTransition>
  );

  return <TetherComponent
    attachment="top center"
    targetAttachment="bottom center"
    renderTarget={renderButton}
    renderElement={renderTooltip}
  />;
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
