import Colors from 'ququmber-ui/Colors';

const UIStepProgressIndicator = (props: UIStepProgressIndicatorProps) => {
  const {current, steps, onSelectStep} = props;
  return <div className="UIStepProgressIndicator">
    {...steps.map((step, idx) => {
      const enabled = step.enabled || current >= idx;
      return [
        <div
          className="stepSpot"
          key={step.name}
          style={{
            border: `2px solid ${current >= idx ? Colors.QUIET : Colors.CONTROL_BORDER}`,
            background: (current >= idx ? Colors.QUIET : 'transparent'),
            cursor: enabled ? 'pointer' : null,
          }}
          onClick={enabled ? () => onSelectStep(idx) : null}>
          <div className="stepSpotLabel">
            {step.name}
          </div>
        </div>,
        (idx < steps.length - 1) ? <div
          className="stepLine"
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
