import UIMultiInput from 'ququmber-ui/input/UIMultiInput';
import UITextInput from 'ququmber-ui/input/UITextInput';
import Editor from './Editor';

const FormSection = () => {
  return <div>
    <Editor
      scope={{UIMultiInput, UITextInput}}
      code={
`<div>
  <p>UITextInput</p>
  <UITextInput />
  <p>UIMultiInput</p>
  <UIMultiInput
    options={[
      {name: 'Option one', value: '1'},
      {name: 'Option two', value: '2'}
    ]}
    selected={['1']}
    onOptionAdd={() => {}}
    onOptionRemove={() => {}}
  />
</div>`
      }
    />
  </div>;
};

export default FormSection;
