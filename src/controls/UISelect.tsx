import {map} from 'lodash';
import * as React from 'react';

export class UISelect extends React.Component<UISelectProps, {}> {
  public static defaultProps = {
    defaultValue: null as string,
    onSelect: ()=>{}
  };

  render() {
    return <select
      className="UISelect"
      onChange={(e) => this.props.onSelect((e.target as HTMLSelectElement).value)}
    >
      {map(this.props.options, (value, key) =>
        <option
          key={key}
          value={key}
          selected={key === this.props.defaultValue}
        >{value}</option>
      )}
    </select>;
  }
}

export interface UISelectProps extends React.Props<UISelect> {
    defaultValue?: string;
    onSelect?: (key: string) => void;
    options: {[key: string]: string};
}

export default UISelect;
