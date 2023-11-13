import {css} from '@emotion/react';
import * as Color from 'color';
import {MutableRefObject, useCallback, useState, forwardRef, CSSProperties} from 'react';
import TetherComponent from 'react-tether';

import Colors from 'ququmber-ui/Colors';
import Stylings from 'ququmber-ui/Stylings';
import useDelayedMouseHover from 'ququmber-ui/utils/useDelayedMouseHover';


const styles = {
  root: css`
    background: transparent;
    border: 0;
    font-size: 1em;

    i {
      margin: 0;
      display: flex;
    }

    &:hover,
    &:hover>i {
      background: transparent;
    }

    &:active,
    &:active>i {
      background: transparent;
    }
    
    &:focus,
    &:focus>i {
      background: transparent;
    }

    &.styling-control {
      color: ${Colors.QUQUMBER};
      &:hover,
      &:hover>i {
        color: ${Color(Colors.QUQUMBER).lighten(.2).hex()};
      }

      &:active,
      &:active>i {
        color: ${Colors.QUQUMBER};
      }

      &:focus,
      &:focus>i {
        color: ${Color(Colors.QUQUMBER).lighten(.2).hex()};
      }
    }

    &.styling-notify {
      color: ${Colors.NOTIFY};

      &:hover,
      &:hover>i {
        color: ${Color(Colors.NOTIFY).lighten(.2).hex()};
      }

      &:active,
      &:active>i {
        color: ${Colors.NOTIFY};
      }

      &:focus,
      &:focus>i {
        color: ${Color(Colors.NOTIFY).lighten(.2).hex()};
      }
    }

    &.styling-red {
      color: ${Colors.RED};

      &:hover,
      &:hover>i {
        color: ${Color(Colors.RED).lighten(.2).hex()};
      }

      &:active,
      &:active>i {
        color: ${Colors.RED};
      }

      &:focus,
      &:focus>i {
        color: ${Color(Colors.RED).lighten(.2).hex()};
      }
    }

    &.styling-control-dark {
      color: ${Colors.BASEFONT_DARK};

      &:hover,
      &:hover>i {
        color: ${Color(Colors.BASEFONT_DARK).lighten(.2).hex()};
      }

      &:active,
      &:active>i {
        color: ${Colors.BASEFONT_DARK};
      }

      &:focus,
      &:focus>i {
        color: ${Color(Colors.BASEFONT_DARK).lighten(.2).hex()};
      }
    }
  `,
};

const UIIconButton = forwardRef<HTMLSpanElement, UIIconButtonProps>((props: UIIconButtonProps, ref) => {
  const {className, onClick, disabled, icon, styling, style, tooltip} = props;
  const [showTooltip ,setShowTooltip] = useState(false);

  const setShowTooltipIfEnabled = useCallback((v: boolean) => {
    return tooltip && setShowTooltip(v);
  }, [tooltip]);
  const [onMouseOver, onMouseOut] = useDelayedMouseHover(setShowTooltipIfEnabled, 300, 0);
  const buttonWithMaybeTooltipProps = tooltip ? {onMouseOver, onMouseOut} : {};

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

  return (
    <span ref={ref}>
      <button
        style={style}
        css={styles.root}
        className={`styling-${styling} ${className || ''}`}
        onClick={onClick}
        disabled={disabled}
        {...buttonWithMaybeTooltipProps}>
        <i className={icon} />
      </button>
      {showTooltip && <TetherComponent
        attachment="top center"
        targetAttachment="bottom center"
        renderTarget={(tetherRef: MutableRefObject<HTMLDivElement>) => (
          <div ref={tetherRef} style={{height: 0}} />
        )}
        renderElement={renderTooltip}
      />}
    </span>
  );
});

UIIconButton.defaultProps = {
  className: '',
  disabled: false,
  styling: Stylings.CONTROL,
};

export type UIIconButtonProps = {
  icon: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  tooltip?: string;
  styling?: Stylings;
  style?: CSSProperties;
};

export default UIIconButton;
