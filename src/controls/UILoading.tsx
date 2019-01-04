import * as React from "react";

export class UILoading extends React.Component<UILoadingProps, {}> {
  render() {
    const {size} = this.props;
    const color = this.props.color || '#eeeeee';

    /* tslint:disable:max-line-length */
    return <div className="UILoading" style={{fontSize: size}}>
      <div style={{marginLeft: `-.5em`, marginTop: `-.5em`}}  dangerouslySetInnerHTML={{__html: `
        <svg width='1em' height='1em' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-ring">
          <rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect>
          <circle cx="50" cy="50" r="40" stroke-dasharray="163.36281798666926 87.9645943005142" stroke="${color}" fill="none" stroke-width="20px">
            <animateTransform attributeName="transform" type="rotate" values="0 50 50;180 50 50;360 50 50;" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite" begin="0s"></animateTransform>
          </circle>
        </svg>
      `}} />
    </div>;
    /* tslint:enable:max-line-length */
  }
}

export interface UILoadingProps extends React.Props<UILoading> {
  size?: number;
  color?: string;
}

export default UILoading;
