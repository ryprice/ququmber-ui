import * as React from 'react';

import Colors from 'ququmber-ui/Colors';

export class UILoading extends React.Component<UILoadingProps, {}> {
  render() {
    const {size, text} = this.props;
    const color = this.props.color || '#eeeeee';

    /* eslint-disable max-len */
    const spinner = <div style={{fontSize: size}}>
      <div dangerouslySetInnerHTML={{__html: `
        <svg width='1em' height='1em' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-ring">
          <rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect>
          <circle cx="50" cy="50" r="40" stroke-dasharray="163.36281798666926 87.9645943005142" stroke="${color}" fill="none" stroke-width="20px">
            <animateTransform attributeName="transform" type="rotate" values="0 50 50;180 50 50;360 50 50;" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite" begin="0s"></animateTransform>
          </circle>
        </svg>
      `}} />
    </div>;
    /* eslint-disable max-len */

    const marginStyles = {
      marginLeft: size ? `-${size/2}px` : '-.5em',
      marginTop: size ? `-${size/2}px` : '-.5em',
    };

    if (text) {
      const width = size ? Math.max(size * 2.5, 110) : '10em';
      const negHalfWidth = size ? `-${Math.max(size * 2.5, 110)/2}px` : '-.5em';
      return  (
        <div className="UILoading">
          <div style={{
            ...marginStyles,
            marginLeft: negHalfWidth,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{
              width: size ? `${size}px` : '1em',
              height: size ? `${size}px` : '1em'
            }}>
              {spinner}
            </div>
            <div style={{width: `${width}px`, marginTop: '.6em', color: Colors.QUIET}}>
              {text}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="UILoading">
        <div style={marginStyles}>
          {spinner}
        </div>
      </div>
    );
  }
}

export type UILoadingProps = {
  size?: number;
  color?: string;
  text?: string;
};

export default UILoading;
