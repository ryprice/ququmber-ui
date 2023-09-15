import {css} from '@emotion/react';

const styles = {
  root: css`
    margin: 0 30px 30px 30px;
  `,
  componentTitle: css`
    margin-top: 0;
    font-family: monospace;
  `,
  componentWell: css`
    border: #eeeeee 1px solid;
    padding: 10px;
  `,
};

const ComponentSection = (props: ComponentSectionProps) => {
  return <div css={styles.root}>
    <h1 css={styles.componentTitle}>{props.name}</h1>
    <div css={styles.componentWell}>
      {props.children}
    </div>
  </div>;
};

type ComponentSectionProps = {
  name: string;
  children: React.ReactNode;
};

export default ComponentSection;
