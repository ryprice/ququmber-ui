import * as React from 'react';

import UITag from 'ququmber-ui/controls/UITag';

const UITagSample = () =>
  <div>
    <div>
      <h1>Filled</h1>
      <UITag name="Shopping" canRemove={true} color="4286f4" />
      <UITag name="Work" canRemove={true} color="f4e242" />
      <UITag name="Sideproject" canRemove={true} color="b72924" />
      <UITag name="Untriaged" canRemove={true} color="238444" />
    </div>
    <div>
      <h1>Outlined</h1>
      <UITag name="Shopping" canRemove={true} color="4286f4" outline={true} />
      <UITag name="Work" canRemove={true} color="f4e242" outline={true} />
      <UITag name="Sideproject" canRemove={true} color="b72924" outline={true} />
      <UITag name="Untriaged" canRemove={true} color="238444" outline={true} />
    </div>
  </div>;

export default UITagSample;
