import * as React from 'react';

import UIButton from 'ququmber-ui/button/UIButton';
import UIColorSelector from 'ququmber-ui/controls/UIColorSelector';

const {useState} = React;

const UIColorSelectorSample = () => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState('');

  return <div>
    <div style={{
      width: '120px',
      height: '120px',
      marginBottom: '15px',
      backgroundColor: `#${color}`,
    }} />
    <UIColorSelector
      open={open}
      onColorChange={setColor}
      onClose={() => setOpen(false)}
      value={color}>
      <UIButton
        onClick={() => setOpen(true)}>
        Show UIColorSelector
      </UIButton>
    </UIColorSelector>
  </div>;
};

export default UIColorSelectorSample;
