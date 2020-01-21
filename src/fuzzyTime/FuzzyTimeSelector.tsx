import * as React from 'react';

import {FuzzyTimeRange} from 'listlab-api';

export class FuzzyTimeSelector extends React.Component<FuzzyTimeSelectorProps, {}> {
  render(): React.ReactNode {
    return null;
  }
}

export interface FuzzyTimeSelectorProps extends React.Props<FuzzyTimeSelector> {
  value: FuzzyTimeSelector;
  bounds: FuzzyTimeRange;
}

export default FuzzyTimeSelector;
