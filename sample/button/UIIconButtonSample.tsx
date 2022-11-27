import UIIconButton from 'ququmber-ui/button/UIIconButton';
import Editor from '../Editor';

const UIIconButtonSample = () => {
  return <div>
    <Editor
      code={
`
<div>
  <UIIconButton
    icon="fa fa-inbox"
    tooltip="Inbox"
  />
  <br />
  <div style={{fontSize: '20px'}}>
    <UIIconButton
      icon="fa fa-sync"
      tooltip="Update"
    />
  </div>
  <br />
</div>
`
      }
      scope={{UIIconButton}}
    />
  </div>;
};

export default UIIconButtonSample;