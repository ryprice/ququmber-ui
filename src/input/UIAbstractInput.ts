import {css} from '@emotion/react';
import * as Color from 'color';
import Colors from 'ququmber-ui/Colors';
import {BORDER_RADIUS_INPUT, TRANSITION_DEFAULT} from 'ququmber-ui/Constants';

export const UIAbstractInputStyle = css`
  display: flex;
  transition: ${TRANSITION_DEFAULT};
  border-radius: ${BORDER_RADIUS_INPUT};

  &:focus,
  &.focus {
    background: ${Colors.CONTROL_FOCUS};
  }

  &.styling-outline {
    background: transparent;
    border: solid ${Colors.CONTROL_BORDER} 1px;
    color: ${Colors.BASEFONT};

    &:hover {
      background: ${Colors.CONTROL};
    }

    &:active {
      background: ${Color(Colors.CONTROL).darken(.03).hex()};
    }

    &:disabled {
      background: ${Color(Colors.CONTROL).lighten(15).hex()};
      color: ${Colors.QUIET};
    }
  }

  &.styling-matte {
    background: ${Colors.CONTROL_FLAT};
    border: solid ${Colors.CONTROL_FLAT} 1px;
    color: ${Colors.BASEFONT};

    &:hover {
      background: ${Color(Colors.CONTROL_FLAT).darken(.06).hex()};
    }

    &:active {
      background: ${Color(Colors.CONTROL_FLAT).darken(.12).hex()};
    }

    &:disabled {
      background: ${Color(Colors.CONTROL_FLAT).lighten(.15).hex()};
      color: ${Colors.QUIET};
    }
  }

  &.styling-flat {
    background: transparent;
    border: transparent;
    color: ${Colors.BASEFONT};

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
`;
