import * as React from 'react';

import UIButton from 'ququmber-ui/button/UIButton';

const UIButtonSample = () =>
  <div>
    <UIButton style={{width: '200px'}}>Default Color</UIButton><br />
    <UIButton style={{width: '200px'}} color="go">Go</UIButton><br />
    <UIButton style={{width: '200px'}} color="facebook">Facebook</UIButton><br />
    <UIButton style={{width: '200px'}} color="google">Google</UIButton><br />
    <UIButton style={{width: '200px'}} color="go" loading={true}>Loading</UIButton><br />
    <UIButton style={{fontSize: '20px'}} color="facebook">20px Large Button</UIButton><br />
  </div>;

export default UIButtonSample;
