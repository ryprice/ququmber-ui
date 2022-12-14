import { css } from '@emotion/react';
import Colors from 'ququmber-ui/Colors';
import * as React from 'react';

const styles = {
  root: css`
    background: ${Colors.NOTIFY};
    box-shadow:${Colors.NOTIFY} 0 0 6px;
    height: 3px;
    transition: all 200ms ease 0s;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  `
};

class UINanoProgress extends React.Component<UINanoProgressProps, UINanoProgressState> {

  private timerId: number;

  static defaultProps: UINanoProgressProps = {
    initialValue: 0,
    completionLinger: 500,
    optimismFactor: 0.25,
    optimismIncrement: 150
  };

  constructor(props: UINanoProgressProps) {
    super(props);
    const {initialValue, value} = props;
    this.state = {
      value: value != null ? Math.max(initialValue, value) : null
    };
  }

  componentDidMount() {
    const {value, optimismIncrement} = this.props;
    if (value != null) {
      this.timerId = window.setTimeout(
        () => this.incrementProgress(value),
        optimismIncrement
      );
    }
  }

  componentWillUnmount() {
    const {value} = this.state;
    window.clearTimeout(this.timerId);
    if (value >= 100) {
      this.setState({value: null});
    }
    this.timerId = null;
  }

  componentWillReceiveProps(nextProps: UINanoProgressProps) {
    if (this.props.value !== nextProps.value) {
      if (nextProps.value >= 100 || nextProps.value == null) {
        this.completeProgress();
      } else {
        this.incrementProgress(nextProps.value);
      }
    }
  }

  incrementProgress = (nextValue: number) => {
    const {optimismFactor, optimismIncrement} = this.props;
    const {value} = this.state;
    window.clearTimeout(this.timerId);
    if (value < 99.5 && nextValue != null) {
      this.setState({value: Math.max(value, nextValue)});
      this.timerId = window.setTimeout(this.incrementProgress, optimismIncrement);
    } else if (nextValue == null) {
      this.setState({
        value: value + (100 - value) * optimismFactor
      });
      this.timerId = window.setTimeout(this.incrementProgress, optimismIncrement);
    }
  };

  completeProgress = () => {
    const {completionLinger, optimismIncrement} = this.props;
    window.clearTimeout(this.timerId);
    this.timerId = window.setTimeout(() => {
      this.setState({value: 100});
      this.timerId = window.setTimeout(() => {
        this.setState({value: null});
      }, completionLinger);
    }, optimismIncrement);
  };

  render() {
    const {value} = this.state;
    return (value != null) && <div
      css={styles.root}
      style={{width: `${value}%`}}
    />;
  }
}

type UINanoProgressState = {
  value: number;
};

export type UINanoProgressProps = {
  value?: number;
  initialValue?: number;
  completionLinger?: number;
  optimismFactor?: number;
  optimismIncrement?: number;
  className?: string;
};

export default UINanoProgress;
