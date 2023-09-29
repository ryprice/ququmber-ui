import {Global, css} from '@emotion/react';
import Colors from 'ququmber-ui/Colors';
import {BORDER_RADIUS_INPUT, TRANSITION_DEFAULT} from 'ququmber-ui/Constants';

const QuqumberUIGlobalStyles = () => {
  return <Global styles={css`
    button {
      border: 0;
      background: ${Colors.CONTROL};
      padding: .35em;
      cursor: pointer;
      outline: none;
      transition: ${TRANSITION_DEFAULT};
      font-size: 14px;

      &:disabled {
        cursor: default;
      }

      &:focus {
        background: ${Colors.CONTROL_FOCUS};
      }
    }

    input,
    textarea {
      border: 0;
      background: ${Colors.CONTROL};
      outline: none;
      font-size: 14px;
      border-radius: ${BORDER_RADIUS_INPUT};
      transition: $transition-default;

      &:focus {
        background: ${Colors.CONTROL_FOCUS};
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
      color: ${Colors.BASEFONT};
      margin-bottom: .5em;
      line-height: 1.5em;
    }

    h1 {
      font-size: 2em;
      line-height: 2em;
      margin-top: 2em;
    }

    h2 {
      font-size: 1.5em;
      line-height: 1.5em;
      margin-top: 1.5em;
    }

    h3 {
      font-size: 1.25em;
      line-height: 1.25em;
      margin-top: 1.25em;
    }

    a {
      text-decoration: underline;
      cursor: pointer;
      color: ${Colors.NOTIFY};

      &:visited {
        color: ${Colors.NOTIFY};
      }
    }
  `} />;
};

export default QuqumberUIGlobalStyles;
