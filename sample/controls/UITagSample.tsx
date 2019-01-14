import * as React from 'react';

import UITag from 'ququmber-ui/controls/UITag';

const UITagSample = () =>
  <div>
    <UITag name="Shopping" canRemove={true} color="4286f4" />
    <UITag name="Work" canRemove={true} color="f4e242" />
    <UITag name="Sideproject" canRemove={true} color="b72924" />
    <UITag name="Untriaged" canRemove={true} color="238444" />
  </div>;

export default UITagSample;
