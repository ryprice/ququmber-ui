import {css} from '@emotion/react';

const styles = {
  root: css`
    background: #ffffff;

    @keyframes fullView {
      100% {
        width: 100%;
      }
    }

    @keyframes fullView {
      100% {
        width: 100%;
      }
    }
  `,
  outer: css`
    animation: fullView 0.5s forwards linear;
    width: 100%;
    height: 100%;
  `,
  inner: css`
    animation: shimmer 3s;
    animation-iteration-count: infinite;
    background: linear-gradient(to right, #e8e8e8 5%, #d8d8d8 25%, #e8e8e8 35%);
    background-size: 1000px 100%;
    width: 100%;
    height: 100%;
  `,
};

// Usa

type UIShimmerRectProps = {
  className?: string;
  style?: Object
};

const UIShimmerRect = (props: UIShimmerRectProps) => {
  const {className, style} = props;

  return <div css={styles.root} className={className} style={style}>
    <div css={styles.outer}>
      <div css={styles.inner} />
    </div>
  </div>;
};

export default UIShimmerRect;
