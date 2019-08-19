import * as React from 'react';

import UISelect from 'ququmber-ui/input/UISelect';

const {useState} = React;

const UISelectSample = (props: {}) => {
  const [selected, setSelected] = useState('1');

  return (
    <UISelect
      options={[
        {value: '1', name: 'Peach'},
        {value: '2', name: 'Apple'},
        {value: '3', name: 'Orange'},
        {value: '4', name: 'Pear'},
        {value: '5', name: 'Banana'},
        {value: '6', name: 'Blueberry'},
        {value: '7', name: 'Strawberry'},
        {value: '8', name: 'Pineapple'},
        {value: '9', name: 'Honeydew'},
        {value: '10', name: 'Mango'},
        {value: '11', name: 'Raspberry'},
        {value: '12', name: 'Lemon'},
        {value: '13', name: 'Lime'},

      ]}
      selected={selected}
      onSelect={setSelected}
    />
  );
};

export default UISelectSample;
