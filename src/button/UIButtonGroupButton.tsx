import {css} from '@emotion/react';
import * as Color from 'color';
import * as React from 'react';

import Colors from 'ququmber-ui/Colors';
import {BORDER_RADIUS_INPUT} from 'ququmber-ui/Constants';
import Stylings from 'ququmber-ui/Stylings';

const styles = {
  root: css`
    color: ${Colors.WHITE};
    display: inline-block;
    text-decoration: none;
    position: relative;
    outline: none;
    clear: both;
    font-size: 1em;
    padding: .3em;
    border-radius: 0;
    border: 1px solid;
    border-right-width: 0;

    &:first-child {
      border-top-left-radius: ${BORDER_RADIUS_INPUT};
      border-bottom-left-radius: ${BORDER_RADIUS_INPUT};
    }

    &:last-child {
      border-top-right-radius: ${BORDER_RADIUS_INPUT};
      border-bottom-right-radius: ${BORDER_RADIUS_INPUT};
      border-right-width: 1px;
    }

    &.styling-control {
      color: ${Colors.BASEFONT};
      text-shadow: 0 -1px 0 rgba(255, 255, 255, 0.25);
      background: ${Colors.CONTROL};
      border-color: ${Color(Colors.CONTROL).darken(.2).hex()};

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

      &.selected {
        background: ${Colors.CONTROL_SELECTED};

        &:hover {
          background: ${Color(Colors.CONTROL_SELECTED).lighten(.07).hex()};
        }

        &:active {
          background: ${Color(Colors.CONTROL_SELECTED).darken(.03).hex()};
        }

        &:focus {
          background: ${Color(Colors.CONTROL_SELECTED).darken(.03).hex()};
        }

        &:disabled {
          background: ${Color(Colors.CONTROL_SELECTED).lighten(.15).hex()};
        }
      }
    }

    &.styling-outline {
      background: transparent;
      border-color: ${Colors.CONTROL_BORDER};
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

      &.selected {
        background: ${Colors.CONTROL_SELECTED};

        &:hover {
          background: ${Color(Colors.CONTROL_SELECTED).lighten(.07).hex()};
        }

        &:active {
          background: ${Color(Colors.CONTROL_SELECTED).darken(.03).hex()};
        }

        &:focus {
          background: ${Color(Colors.CONTROL_SELECTED).darken(.03).hex()};
        }

        &:disabled {
          background: ${Color(Colors.CONTROL_SELECTED).lighten(.15).hex()};
        }
      }
    }

    &.styling-flat {
      background: transparent;
      border-color: transparent;
      color: ${Colors.BASEFONT};
      text-shadow: transparent;

      &:hover {
        background: ${Colors.CONTROL};
      }

      &:active {
        background: transparent;
      }

      &:disabled {
        background: transparent;
        color: ${Colors.QUIET};
      }

      &.selected {
        background: ${Colors.CONTROL};

        &:hover {
          background: ${Color(Colors.CONTROL).darken(.13).hex()};
        }

        &:active {
          background: ${Color(Colors.CONTROL).darken(.16).hex()};
        }

        &:focus {
          background: ${Color(Colors.CONTROL).darken(.13).hex()};
        }

        &:disabled {
          background: ${Color(Colors.CONTROL).lighten(.15).hex()};
        }
      }
    }

    &.styling-matte {
      background: ${Colors.CONTROL_FLAT};
      color: ${Colors.BASEFONT};
      text-shadow: transparent;
      border: transparent;

      &:hover {
        background: ${Color(Colors.CONTROL_FLAT).darken(.03).hex()};
      }

      &:active {
        background: ${Color(Colors.CONTROL_FLAT).darken(.06).hex()};
      }

      &:disabled {
        background: ${Color(Colors.CONTROL_FLAT).lighten(.15).hex()};
        color: ${Colors.QUIET};
      }

      &.selected {
        background: ${Colors.CONTROL_SELECTED};

        &:hover {
          background: ${Color(Colors.CONTROL_SELECTED).darken(.13).hex()};
        }

        &:active {
          background: ${Color(Colors.CONTROL_SELECTED).darken(.16).hex()};
        }

        &:focus {
          background: ${Color(Colors.CONTROL_SELECTED).darken(.13).hex()};
        }

        &:disabled {
          background: ${Color(Colors.CONTROL_SELECTED).lighten(.15).hex()};
        }
      }
    }
  `
};

const UIButtonGroupButton = (props: UIButtonGroupButtonProps) => {
  const {children, style, className, styling, onClick, selected} = props;
  return (
    <button
      css={styles.root}
      onClick={onClick}
      className={`styling-${styling} ${selected ? 'selected' : ''} ${className != null ? className : ''}`}
      style={style}>
      {children}
    </button>
  );
};

UIButtonGroupButton.defaultProps = {
  styling: Stylings.CONTROL,
};

export type UIButtonGroupButtonProps = {
  className?: string;
  style?: object;
  children?: React.ReactNode;
  disabled?: boolean;
  styling?: Stylings;
  onClick?: () => void;
  id?: string;
  loading?: boolean;
  selected?: boolean;
};

export default UIButtonGroupButton;
