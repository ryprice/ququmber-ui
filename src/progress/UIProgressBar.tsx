import {css} from '@emotion/react';
import Colors from 'ququmber-ui/Colors';

const styles = {
  root: css`
    display: flex;
  `,
  segment: css`
    padding: .3em 0;
    height: 1em;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
    font-size: 1em;
    transition: all 200ms ease 0s;
  `,
  incomplete: css`
    color: ${Colors.OFFWHITE};
    border: 1px solid ${Colors.SILENT};
  `
};

const UIProgressBar = (props: UIProgressBarProps) => {
  const {value, style} = props;
  const filledColor = props.filledColor ?? Colors.NOTIFY;

  return <div style={style} css={styles.root}>
    <div
      css={styles.segment}
      style={{
        flexGrow: value,
        background: filledColor,
      }}
    />
    {value < 1 && <div
      css={[styles.segment, styles.incomplete]}
      style={{flexGrow: 1 - value}}
    />}
  </div>;
};

type UIProgressBarProps = {
  value: number;
  filledColor?: string;
  style?: React.CSSProperties;
};

export default UIProgressBar;
