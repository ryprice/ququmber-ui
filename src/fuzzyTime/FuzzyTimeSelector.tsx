import * as React from 'react';

import {FuzzyTimeRange} from 'ququmber-api';

export class FuzzyTimeSelector extends React.Component<FuzzyTimeSelectorProps, {}> {
    render(): JSX.Element {
        return null;
    }
}

export interface FuzzyTimeSelectorProps extends React.Props<FuzzyTimeSelector> {
    value: FuzzyTimeSelector;
    bounds: FuzzyTimeRange;
}

export default FuzzyTimeSelector;
