import * as React from 'react';

import UINestedTag from 'ququmber-ui/chip/UINestedTag';
import UITag from 'ququmber-ui/chip/UITag';
import Editor from '../Editor';

const UITagSample = () =>
  <div>
    <h1>Filled</h1>
    <Editor
      scope={{UITag}}
      code={
`<div>
  <UITag name="Shopping" canRemove={true} color="4286f4" />
  <UITag name="Work" canRemove={true} color="f4e242" />
  <UITag name="Sideproject" canRemove={true} color="b72924" />
  <UITag name="Untriaged" canRemove={true} color="238444" />
</div>`
      }
    />
    <h1>Outlined</h1>
    <Editor
      scope={{UITag}}
      code={
`<div>
  <UITag name="Shopping" canRemove={true} color="4286f4" outline={true} />
  <UITag name="Work" canRemove={true} color="f4e242" outline={true} />
  <UITag name="Sideproject" canRemove={true} color="b72924" outline={true} />
  <UITag name="Untriaged" canRemove={true} color="238444" outline={true} />
</div>`
      }
    />
    <h1>UINestedTag</h1>
    <Editor
      scope={{UINestedTag}}
      code={
`<div>
  <UINestedTag
    canRemove={true}
    outline={true}
    items={[
      {label: 'Parent', id: 1, color: "4286f4"},
      {label: 'Child', id: 2, color: "f4e242"}
    ]}
  />
</div>`
      }
    />
    <div>
      <h1>Sizes</h1>
      <Editor
        scope={{UITag}}
        code={
`<div>
  <p style={{fontSize: '1em'}}>
    <UITag
      name="Baking"
      canRemove={true}
      color="4286f4"
      outline={false}
    />
    <UITag
      name="Baking"
      canRemove={true}
      color="4286f4"
      outline={true}
    />
  </p>
  <p style={{fontSize: '1.5em'}}>
    <UITag
      name="Baking"
      canRemove={true}
      color="4286f4"
      outline={false}
    />
    <UITag
      name="Baking"
      canRemove={true}
      color="4286f4"
      outline={true}
    />
  </p>
  <p style={{fontSize: '2em'}}>
    <UITag
      name="Baking"
      canRemove={true}
      color="4286f4"
      outline={false}
    />
    <UITag
      name="Baking"
      canRemove={true}
      color="4286f4"
      outline={true}
    />
  </p>
</div>`
        }
      />
    </div>
  </div>;

export default UITagSample;
