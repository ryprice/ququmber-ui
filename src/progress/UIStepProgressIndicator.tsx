import { css } from '@emotion/react';
import Colors from 'ququmber-ui/Colors';

const styles = {
  root: css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  stepSpotLabel: css`
    position: absolute;
    top: 20px;
    text-align: center;
    width: 150px;
    left: -70px;
    color: ${Colors.CONTROL_BORDER};
    align-self: center;
    font-size: .8em;
  `,
  stepSpot: css`
    border-radius: 1em;
    height: 1em;
    width: 1em;
    position: relative;
  `,
  stepLine: css`
    height: 2px;
    width: 130px;
  `
}

const UIStepProgressIndicator = (props: UIStepProgressIndicatorProps) => {
  const {current, steps, onSelectStep} = props;
  return <div css={styles.root}>
    {...steps.map((step, idx) => {
      const enabled = step.enabled || current >= idx;
      return [
        <div
          css={styles.stepSpot}
          key={step.name}
          style={{
            border: `2px solid ${current >= idx ? Colors.QUIET : Colors.CONTROL_BORDER}`,
            background: (current >= idx ? Colors.QUIET : 'transparent'),
            cursor: enabled ? 'pointer' : null,
          }}
          onClick={enabled ? () => onSelectStep(idx) : null}>
          <div css={styles.stepSpotLabel}>
            {step.name}
          </div>
        </div>,
        (idx < steps.length - 1) ? <div
          css={styles.stepLine}
          style={{
            background: (current > idx ? Colors.QUIET : Colors.CONTROL_BORDER),
          }}
        /> : null,
      ];
    })}
  </div>;
};

type UIStepProgressIndicatorStep = {
  name: string;
  enabled: boolean;
};

type UIStepProgressIndicatorProps = {
  current: number;
  steps: UIStepProgressIndicatorStep[];
  onSelectStep: (step: number) => void;
};

export default UIStepProgressIndicator;
