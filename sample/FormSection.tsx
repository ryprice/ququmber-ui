import {map, pick} from 'lodash';
import * as React from 'react';

import UIMultiInput from 'ququmber-ui/input/UIMultiInput';
import UITextInput from 'ququmber-ui/input/UITextInput';

const FormSection = () => {
  const options = [
    {name: 'Option one', value: '1'},
    {name: 'Option two', value: '2'}
  ];

  return <div className="FormSection">
    <p>UITextInput</p>
    <UITextInput />
    <p>UIMultiInput</p>
    <UIMultiInput
      options={options}
      selected={['1']}
      onOptionAdded={() => {}}
      onOptionRemoved={() => {}}
    />
  </div>;
};

export default FormSection;
