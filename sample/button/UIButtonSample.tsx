import * as React from 'react';

import UIButton from 'ququmber-ui/button/UIButton';
import Stylings from 'ququmber-ui/Stylings';

const UIButtonSample = () =>
  <div>
    <UIButton style={{width: '200px'}}>Default Color</UIButton><br />
    <UIButton style={{width: '200px'}} styling={Stylings.GO}>Go</UIButton><br />
    <UIButton style={{width: '200px'}} styling={Stylings.FACEBOOK}>Facebook</UIButton><br />
    <UIButton style={{width: '200px'}} styling={Stylings.GOOGLE}>Google</UIButton><br />
    <UIButton style={{width: '200px'}} styling={Stylings.RED}>Red</UIButton><br />
    <UIButton style={{width: '200px'}} styling={Stylings.GO} loading={true}>Loading</UIButton><br />
    <UIButton style={{fontSize: '20px'}} styling={Stylings.FACEBOOK}>20px Large Button</UIButton><br />
  </div>;

export default UIButtonSample;
