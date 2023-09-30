import {css} from '@emotion/react';
import * as Color from 'color';
import {useCallback, useState, MutableRefObject, forwardRef} from 'react';
import {mergeRefs} from 'react-merge-refs';
import TetherComponent from 'react-tether';

import Colors from 'ququmber-ui/Colors';
import {BORDER_RADIUS_BUTTON} from 'ququmber-ui/Constants';
import UILoading from 'ququmber-ui/progress/UILoading';
import Stylings from 'ququmber-ui/Stylings';
import UIMountTransition from 'ququmber-ui/utils/UIMountTransition';
import useDelayedMouseHover from 'ququmber-ui/utils/useDelayedMouseHover';

const styles = {
  root: css`
    padding: 0;
    border-radius: ${BORDER_RADIUS_BUTTON};
    color: ${Colors.WHITE};
    margin: .5em 0;
    display: inline-block;
    text-decoration: none;
    position: relative;
    outline: none;
    clear: both;
    font-size: 1em;

    .inner {
      margin: .5em;
      display: inline-block;
      position: relative;
      vertical-align: middle;
    }

    .loadingContainer {
      height: .8em;
      width: 1.5em;
      position: relative;
      display: inline-block;
    }

    &.styling-go {
      background: ${Colors.GO};
      border: solid ${Color(Colors.GO).darken(.03).hex()} 1px;

      &:hover {
        background: ${Color(Colors.GO).lighten(.07).hex()};
      }

      &:active {
        background: ${Color(Colors.GO).darken(.03).hex()};
      }

      &:focus {
        background: ${Color(Colors.GO).darken(.03).hex()};
      }

      &:disabled {
        background: ${Color(Colors.GO).lighten(.15).hex()};
        color: rgba(255, 255, 255, 0.75);
      }
    }

    &.styling-control {
      color: ${Colors.BASEFONT};
      text-shadow: 0 -1px 0 rgba(255, 255, 255, 0.25);
      background: ${Colors.CONTROL};
      border: solid ${Color(Colors.CONTROL).darken(.2).hex()} 1px;

      &:hover {
        background: ${Color(Colors.CONTROL).lighten(.07).hex()};
      }

      &:active {
        background: ${Color(Colors.CONTROL).darken(.03).hex()};
      }

      &:focus {
        background: ${Color(Colors.CONTROL).darken(.03).hex()};
      }

      &:disabled {
        background: ${Color(Colors.CONTROL).lighten(.15).hex()};
      }
    }

    &.styling-google {
      background: ${Colors.GOOGLE};
      border: solid ${Color(Colors.GOOGLE).darken(.03).hex()} 1px;

      &:hover {
        background: ${Color(Colors.GOOGLE).lighten(.07).hex()};
      }

      &:active {
        background: ${Color(Colors.GOOGLE).darken(.03).hex()};
      }

      &:disabled {
        background: ${Color(Colors.GOOGLE).lighten(.15).hex()};
        color: rgba(255, 255, 255, 0.75);
      }
    }

    &.styling-facebook {
      background: ${Colors.FACEBOOK};
      border: solid ${Color(Colors.FACEBOOK).darken(.03).hex()} 1px;

      &:hover {
        background: ${Color(Colors.FACEBOOK).lighten(.07).hex()};
      }

      &:active {
        background: ${Color(Colors.FACEBOOK).darken(.03).hex()};
      }

      &:disabled {
        background: ${Color(Colors.FACEBOOK).lighten(.15).hex()};
        color: rgba(255, 255, 255, 0.75);
      }
    }

    &.styling-red {
      background: ${Colors.RED};
      border: solid ${Color(Colors.RED).darken(.03).hex()} 1px;

      &:hover {
        background: ${Color(Colors.RED).lighten(.07).hex()};
      }

      &:active {
        background: ${Color(Colors.RED).darken(.03).hex()};
      }

      &:disabled {
        background: ${Color(Colors.RED).lighten(.15).hex()};
        color: rgba(255, 255, 255, 0.75);
      }
    }

    &.styling-outline {
      background: transparent;
      border: solid ${Colors.CONTROL} 1px;
      color: ${Colors.BASEFONT};
      text-shadow: transparent;

      &:hover {
        background: ${Colors.CONTROL};
      }

      &:active {
        background: ${Color(Colors.CONTROL).darken(.03).hex()};
      }

      &:disabled {
        background: ${Color(Colors.CONTROL).lighten(.15).hex()};
        color: ${Colors.QUIET};
      }
    }

    &.styling-link {
      background: transparent;
      border: 0 transparent;
      color: ${Colors.BASEFONT};
      text-shadow: 0 0 0 transparent;

      .inner {
        text-decoration: underline;
      }

      &:hover,
      &:active {
        .inner {
          color: ${Colors.NOTIFY};
        }
      }

      &:disabled {
        color: ${Colors.QUIET};

        &:hover,
        &:active {
          .inner {
            color: ${Colors.QUIET};
          }
        }
      }
    }

    &.styling-notify {
      background: ${Colors.NOTIFY};
      border: solid ${Color(Colors.NOTIFY).darken(.03).hex()} 1px;

      &:hover {
        background: ${Color(Colors.NOTIFY).lighten(.07).hex()};
      }

      &:active {
        background: ${Color(Colors.NOTIFY).darken(.03).hex()};
      }

      &:disabled {
        background: ${Color(Colors.NOTIFY).lighten(.15).hex()};
        color: rgba(255, 255, 255, 0.75);
      }
    }

    &.styling-flat {
      background: transparent;
      border: 0 transparent;
      color: ${Colors.BASEFONT};
      text-shadow: 0 0 0 transparent;

      &:hover,
      &:active {
        background: ${Colors.CONTROL};
      }

      &:disabled {
        color: ${Colors.QUIET};
      }
    }
  `
};

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
      css={styles.root}
      className={`${className != null ? className : ''} styling-${styling || Stylings.CONTROL}`}
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
