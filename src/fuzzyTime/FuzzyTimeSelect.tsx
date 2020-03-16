import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactVirtualized from 'react-virtualized';

import {
  FuzzyGranularity,
  FuzzyTimeRange,
  Task
} from 'listlab-api';
import FuzzyTime, {buildFuzzyTime} from 'listlab-api/FuzzyTime';

import UIButton from 'ququmber-ui/button/UIButton';
import FuzzyTimeMonthUnit from 'ququmber-ui/fuzzyTime/FuzzyTimeMonthUnit';
import {FuzzyTimeSelectUnitProps} from 'ququmber-ui/fuzzyTime/FuzzyTimeSelectUnit';
import FuzzyTimeYearUnit from 'ququmber-ui/fuzzyTime/FuzzyTimeYearUnit';
import Stylings from 'ququmber-ui/Stylings';
import {weeksInMonth} from 'ququmber-ui/utils/dateUtils';

export enum ViewMode {
  YEARLY,
  DAILY
}

const initialState = (props: FuzzyTimeSelectProps): FuzzyTimeSelectState => {
  const focalPoint = (
    props.focalPoint ||
    (
      props.selected &&
      props.selected.compareTo(FuzzyTime.getForever()) &&
      props.selected
    ) ||
    (props.selectedRange && props.selectedRange.getStart())
    || FuzzyTime.getCurrent(FuzzyGranularity.DAY)
  );
  return {
    focalPoint,
    width: 0,
    height: 0,
    viewMode: focalPoint && focalPoint.getGranularity() === FuzzyGranularity.YEAR
      ? ViewMode.YEARLY
      : ViewMode.DAILY,
    initialSelected: props.selected,
    initialRange: props.selectedRange
  };
};

export class FuzzyTimeSelect extends React.Component<FuzzyTimeSelectProps, FuzzyTimeSelectState> {

  private rootRef: HTMLDivElement;

  readonly state: FuzzyTimeSelectState = initialState(this.props);

  private onResizeTimerId: number = null;

  componentDidMount() {
    this.onResizeTimerId = window.setInterval(() => this.onResize(), 150);
    this.onResize();
  }

  componentWillUnmount() {
    window.clearInterval(this.onResizeTimerId);
  }

  unitOnMouseOver = (t: FuzzyTime) => {
    this.setState({hoverTime: t});
  }

  unitOnMouseOut = (t: FuzzyTime) => {
    this.setState({hoverTime: null});
  }

  unitOnClick = (t: FuzzyTime) => {
    if (this.props.multiselect) {
      if (!this.state.nextRangeStart) {
        this.setState({nextRangeStart: t});
      } else {
        this.props.onRangeSelected(new FuzzyTimeRange(this.state.nextRangeStart, t));
        this.setState({nextRangeStart: undefined});
      }
    } else {
      this.props.onTimeSelected(t);
    }
  }

  onCancelClick = () => {
    const {onTimeSelected, onRangeSelected} = this.props;
    const {initialSelected, initialRange} = this.state;
    if (!this.props.selectedRange) {
      onTimeSelected(initialSelected);
    } else {
      onRangeSelected(initialRange);
    }
  }

  public getUnitProps(): FuzzyTimeSelectUnitProps {
    const {selectedRange, selected, multiselect, onTasksDropped} = this.props;
    const {focalPoint, nextRangeStart, hoverTime} = this.state;
    return {
      time: null,
      disabled: false,
      onClick: this.unitOnClick,
      selectedRange,
      selected,
      multiselect,
      nextRangeStart,
      focalPoint,
      onTasksDropped,
      granularity: focalPoint.getGranularity(),
      onMouseOver: this.unitOnMouseOver,
      onMouseOut: this.unitOnMouseOut,
      hoverTime
    };
  }

  renderRow = (info: {index: number, isScrolling: boolean, style: Object, key: string}): React.ReactNode => {
    let time = this.state.focalPoint;
    switch(this.state.viewMode) {
      case ViewMode.DAILY:
        time = time.getParent(FuzzyGranularity.MONTH);
        break;

      case ViewMode.YEARLY:
        const newTime = time.getTime();
        const year = newTime.getUTCFullYear();
        newTime.setUTCFullYear(year - (year % 4));
        time = buildFuzzyTime(newTime, FuzzyGranularity.YEAR);
        break;
    }

    const {index, key, style} = info;
    time = time.offset(index - 100);

    switch(this.state.viewMode) {
      case ViewMode.DAILY:
        return <FuzzyTimeMonthUnit
          {...this.getUnitProps()}
          key={key}
          time={time}
          style={style}
        />;

      case ViewMode.YEARLY:
        return <FuzzyTimeYearUnit
          {...this.getUnitProps()}
          key={key}
          time={time}
          style={style}
        />;
    }
    return null;
  }

  getRowHeight = (info: {index: number}) => {
    const {index} = info;
    switch(this.state.viewMode) {
      case ViewMode.DAILY: {
        const month = this.state.focalPoint
          .withGranularity(FuzzyGranularity.MONTH)
          .offset(index - 100);
        return (58 + 32 * weeksInMonth(
          month.getTime().getUTCMonth(),
          month.getTime().getUTCFullYear()
        ));
      }

      case ViewMode.YEARLY:
        return 130;
    }
    return 0;
  }

  renderViewModeButton(viewMode: ViewMode, text: string, icon: string) {
    return <button
      key={viewMode}
      className={this.state.viewMode === viewMode ? 'selected' : ''}
      onClick={() => this.setState({viewMode})}
    >
      <i className={icon} />
      {text}
    </button>;
  }

  renderQuickOption(time: FuzzyTime, name: string, icon: string) {
    const {selected, selectedRange} = this.props;
    const selectedOrRangeSelected = (
      time.equals(selected) ||
      (
        selectedRange &&
        selectedRange.getStart().equals(time) &&
        selectedRange.getEnd().equals(time)
      )
    );

    return <button
      key={`${time.toString()}-quickoption`}
      className={`quickOption ${selectedOrRangeSelected ? 'selected' : ''}`}
      onClick={() => this.onQuckOptionClick(time)}
      onMouseOver={() => this.unitOnMouseOver(time)}
      onMouseOut={() => this.unitOnMouseOut(time)}>
      <i className={icon} />
    </button>;
  }

  onQuckOptionClick = (time: FuzzyTime) => {
    const {onTimeSelected, multiselect, onRangeSelected} = this.props;
    if (!multiselect) {
      onTimeSelected(time);
    } else {
      onRangeSelected(new FuzzyTimeRange(time, time));
    }
  }

  private renderQuickOptions() {
    const today = FuzzyTime.getCurrent(FuzzyGranularity.DAY);
    const tomorrow = today.getNext();
    const thisWeek = FuzzyTime.getCurrent(FuzzyGranularity.WEEK);
    const nextWeek = thisWeek.getNext();
    const nextMonth = FuzzyTime.getCurrent(FuzzyGranularity.MONTH).getNext();

    const quickOptions = this.props.quickOptions != null
      ? this.props.quickOptions
      : [
        {time: today, name: 'today', icon: 'qqico qqico-cal-day'},
        {time: tomorrow, name: 'tomorrow', icon: 'qqico qqico-cal-tomorrow'},
        {time: thisWeek, name: 'this week', icon: 'qqico qqico-cal-week'},
        {time: nextWeek, name: 'next week', icon: 'qqico qqico-cal-next-week'},
        {time: nextMonth, name: 'next month', icon: 'qqico qqico-cal-next-month'},
      ];
    if (quickOptions.length === 0) {
      return null;
    }
    return <div className="quickOptions">
      {quickOptions.map(qo => this.renderQuickOption(qo.time, qo.name, qo.icon))}
      <div style={{flexGrow: 1}} />
      <UIButton
        style={{margin: 0}}
        styling={Stylings.LINK}
        onClick={() => this.onQuckOptionClick(FuzzyTime.getForever())}>
        clear
      </UIButton>
    </div>;
  }

  render() {
    const {width, height, viewMode, focalPoint, nextRangeStart, hoverTime} = this.state;

    const invalidationPropsForRows = {
      focalPoint,
      viewMode,
      nextRangeStart,
      hoverTime
    };

    return <div className="FuzzyTimeSelect" ref={(ref) => this.rootRef = ref}>
      {this.renderQuickOptions()}
      <div className="viewModeSelector">
        {this.renderViewModeButton(ViewMode.DAILY, 'calendar', 'qqico qqico-cal-day')}
        {this.renderViewModeButton(ViewMode.YEARLY, 'years', 'qqico qqico-cal-year')}
      </div>
      <ReactVirtualized.List
        key={'virtualScroll' + viewMode}
        className="scrollContainer"
        width={width}
        height={height}
        rowHeight={this.getRowHeight}
        rowCount={500}
        overscanRowCount={2}
        rowRenderer={this.renderRow}
        style={{}}
        scrollToIndex={101}
        {...invalidationPropsForRows}
      />
    </div>;
  }

  private onResize() {
    const newWidth = (ReactDOM.findDOMNode(this.rootRef) as HTMLDivElement).clientWidth;
    const newHeight = (ReactDOM.findDOMNode(this.rootRef) as HTMLDivElement).clientHeight;
    const {width, height} = this.state;
    if (newWidth !== width || newHeight !== height) {
      this.setState({width: newWidth, height: newHeight});
    }
  }
}

export type FuzzyTimeSelectProps = {
  focalPoint?: FuzzyTime;
  onTimeSelected?: (time: FuzzyTime) => void;
  onTasksDropped?: (tasks: Task[], time: FuzzyTime) => void;
  selected?: FuzzyTime;
  selectedRange?: FuzzyTimeRange;
  multiselect?: boolean;
  onRangeSelected?: (range: FuzzyTimeRange) => void;
  quickOptions?: {time: FuzzyTime, name: string, icon: string}[];
};

type FuzzyTimeSelectState = {
  focalPoint: FuzzyTime;
  viewMode: ViewMode;
  width: number;
  height: number;
  // First half of range selection. When defined, range selection is in progress
  nextRangeStart?: FuzzyTime;
  hoverTime?: FuzzyTime;
  initialSelected?: FuzzyTime;
  initialRange?: FuzzyTimeRange;
};

export default FuzzyTimeSelect;
