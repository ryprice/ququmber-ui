import * as React from 'react';

import UIDropdownButton from 'ququmber-ui/button/UIDropdownButton';
import Stylings from 'ququmber-ui/Stylings';

const UIDropdownButtonSample = () =>
  <div>
    <UIDropdownButton
      name="Clipboard actions"
      options={[
        {name: 'Cut', icon: 'fa fa-cut', onClick: () => alert('Cut')},
        {name: 'Paste', icon: 'fa fa-paste', onClick: () => alert('Paste')},
      ]}
    /><br />
  </div>;

export default UIDropdownButtonSample;
