import {useState} from 'react';

import UIMultiInput from 'ququmber-ui/input/UIMultiInput';
import Editor from '../Editor';

const UIMultiInputSample = () => {
  const [selected, setSelected] = useState(['1', '2']);

  return <div>
    <h1>Searchable dropdown</h1>
    <Editor
      scope={{selected, setSelected, UIMultiInput}}
      code={
`<UIMultiInput
  options={[
    {value: '1', name: 'Ford'},
    {value: '2', name: 'Mazda'},
    {value: '3', name: 'Ferrari'},
    {value: '4', name: 'Honda'},
    {value: '5', name: 'Toyota'},
    {value: '6', name: 'Lamborghini'},
    {value: '7', name: 'Lexus'},
    {value: '8', name: 'Fiat'},
    {value: '9', name: 'BMW'},
    {value: '10', name: 'Lincoln'},
    {value: '11', name: 'Tesla'},
    {value: '12', name: 'Jeep'},
    {value: '13', name: 'Crysler'},

  ]}
  selected={selected}
  onOptionAdd={key => setSelected([...selected, key])}
  onOptionRemoved={removedKey => {
    setSelected(selected.filter(key => key !== removedKey));
  }}
/>`
      }
    />
  </div>;
};

export default UIMultiInputSample;
