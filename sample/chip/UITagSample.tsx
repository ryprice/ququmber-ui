import UINestedTag from 'ququmber-ui/chip/UINestedTag';
import Colors from 'ququmber-ui/Colors';
import UITag from 'ququmber-ui/chip/UITag';
import Editor from '../Editor';

const UITagSample = () =>
  <div>
    <h1>Filled</h1>
    <Editor
      scope={{UITag}}
      code={
`<div>
  <UITag name="Shopping" canRemove={true} color="#32A150" />
  <UITag name="Work" canRemove={true} color="#0095FF" />
  <UITag name="Sideproject" canRemove={true} color="#ffdf82" />
  <UITag name="Untriaged" canRemove={true} color="#90dda1" />
</div>`
      }
    />
    <h1>Outlined</h1>
    <Editor
      scope={{UITag, Colors}}
      code={
`<div>
  <UITag name="Shopping" canRemove={true} color="#32A150" outline={true} />
  <UITag name="Work" canRemove={true} color="#0095FF" outline={true} />
  <UITag name="Sideproject" canRemove={true} color="#ffdf82" outline={true} />
  <UITag name="Untriaged" canRemove={true} color="#90dda1" outline={true} />
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
    items={[
      {label: 'Parent', id: 1, color: "#32A150"},
      {label: 'Child', id: 2, color: "#0095FF"}
    ]}
  />
  <UINestedTag
    canRemove={true}
    rounded={true}
    items={[
      {label: 'Parent', id: 1, color: "#32A150"},
      {label: 'Child', id: 2, color: "#0095FF"}
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
      color="#0095FF"
      outline={true}
    />
    <UITag
      name="Baking"
      canRemove={true}
      color="#0095FF"
      outline={true}
    />
  </p>
  <p style={{fontSize: '1.5em'}}>
    <UITag
      name="Baking"
      canRemove={true}
      color="#0095FF"
      outline={false}
    />
    <UITag
      name="Baking"
      canRemove={true}
      color="#0095FF"
      outline={true}
    />
  </p>
  <p style={{fontSize: '2em'}}>
    <UITag
      name="Baking"
      canRemove={true}
      color="#0095FF"
      outline={false}
    />
    <UITag
      name="Baking"
      canRemove={true}
      color="#0095FF"
      outline={true}
    />
  </p>
</div>`
        }
      />
    </div>
  </div>;

export default UITagSample;
