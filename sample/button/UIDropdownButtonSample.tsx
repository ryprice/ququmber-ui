import UIDropdownButton from 'ququmber-ui/button/UIDropdownButton';
import Editor from '../Editor';

const UIDropdownButtonSample = () =>
  <div>
    <Editor
      code={
`
  <UIDropdownButton
    name="Clipboard actions"
    options={[
      {
        name: 'Cut',
        icon: 'fa fa-cut',
        onClick: () => alert('Cut')
      },
      {
        name: 'Paste',
        icon: 'fa fa-paste',
        onClick: () => alert('Paste')
      },
    ]}
  />
`
      }
      scope={{UIDropdownButton}}
    />
  </div>;

export default UIDropdownButtonSample;
