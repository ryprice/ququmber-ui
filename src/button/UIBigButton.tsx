import {css} from '@emotion/react';
import {ReactNode, CSSProperties} from 'react';
import Colors from 'ququmber-ui/Colors';

const styles = {
  root: css`
    border-radius: .3em;
    border: 2px transparent solid;
    background: transparent;

    &:hover {
      border-color: ${Colors.CONTROL_BORDER};
    }

    &:focus {
      background: transparent;
    }
  `,
  selected: css`
    border-color: ${Colors.NOTIFY};
  `,
};

const BigButton = (props: BigButtonProps) => {
  const {selected, children, onClick, className, style} = props;

  return <button
    style={style}
    onClick={onClick}
    className={className}
    css={[styles.root, selected && styles.selected]}>
    {children}
  </button>;
};

type BigButtonProps = {
  children: ReactNode;
  selected: boolean;
  onClick: () => void;
  className?: string;
  style?: CSSProperties;
};

export default BigButton;
