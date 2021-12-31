import * as React from 'react';

import UIShimmerRect from 'ququmber-ui/progress/UIShimmerRect';
import Editor from '../Editor';

const ShimmerSample = () => {
  return <div>
    <h1>UIShimmerRect</h1>
    <Editor
      scope={{UIShimmerRect}}
      code={
`<UIShimmerRect
  style={{
    width: '350px',
    height: '1em',
  }}
/>`
      }
    />
  </div>;
};

export default ShimmerSample;
