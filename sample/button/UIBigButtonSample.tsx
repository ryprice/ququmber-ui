import UIBigButton from 'ququmber-ui/button/UIBigButton';
import Editor from '../Editor';
import {useState} from 'react';

const UIBigButtonSample = () => {
  const [selected, setSelected] = useState('fish');
  return <div>
    <Editor
      code={
`
<div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
  <UIBigButton
    selected={selected === 'fish'}
    onClick={() => setSelected('fish')}
    style={{width: '150px', padding: '10px', fontSize: '18px'}}>
    <p><i className="fa fa-fish" /></p>
    <p>Print</p>
  </UIBigButton>
  <UIBigButton
    selected={selected === 'kiwi'}
    onClick={() => setSelected('kiwi')}
    style={{width: '150px', padding: '10px', fontSize: '18px'}}>
    <p><i className="fa fa-kiwi-bird" /></p>
    <p>Kiwi</p>
  </UIBigButton>
  <UIBigButton
    selected={selected === 'frog'}
    onClick={() => setSelected('frog')}
    style={{width: '150px', padding: '10px', fontSize: '18px'}}>
    <p><i className="fa fa-frog" /></p>
    <p>Frog</p>
  </UIBigButton>
</div>
`
      }
      scope={{UIBigButton, selected, setSelected}}
    />
  </div>;
};

export default UIBigButtonSample;
