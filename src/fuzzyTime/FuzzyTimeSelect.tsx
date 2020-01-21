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
    (props.range && props.range.getStart())
    || FuzzyTime.getCurrent(FuzzyGranularity.DAY)
  );
  return {
    focalPoint,
    width: 0,
    height: 0,
    midselect: false,
    viewMode: focalPoint && focalPoint.getGranularity() === FuzzyGranularity.YEAR
      ? ViewMode.YEARLY
      : ViewMode.DAILY,
    initialSelected: props.selected,
    initialRange: props.range
  };
};

export class FuzzyTimeSelect extends React.Component<FuzzyTimeSelectProps, FuzzyTimeSelectState> {

  // private readonly scrollContainerEl: Element;

  private rootRef: HTMLDivElement;

  readonly state: FuzzyTimeSelectState = initialState(this.props);

  private shouldScrollToFocalPoint = false;

  private onResizeTimerId: number = null;

  componentDidMount() {
    this.onResizeTimerId = window.setInterval(() => this.onResize(), 150);
    this.onResize();
    // this.scrollToFocalPoint();
  }

  componentDidUpdate() {
    if (this.shouldScrollToFocalPoint) {
      this.scrollToFocalPoint();
      this.shouldScrollToFocalPoint = false;
    }
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
      if (!this.state.midselect) {
        this.setState({start: t, midselect: true});
      } else {
        this.props.onRangeSelected(new FuzzyTimeRange(this.state.start, t));
        this.setState({start: undefined, midselect: false});
      }
    } else {
      this.props.onTimeSelected(t);
    }
  }

  onCancelClick = () => {
    const {onTimeSelected, onRangeSelected} = this.props;
    const {initialSelected, initialRange} = this.state;
    if (!this.props.range) {
      onTimeSelected(initialSelected);
    } else {
      onRangeSelected(initialRange);
    }
  }

  public getUnitProps(): FuzzyTimeSelectUnitProps {
    const {range, selected, multiselect, onTasksDropped} = this.props;
    const {focalPoint, start, hoverTime} = this.state;
    return {
      time: null,
      disabled: false,
      onClick: this.unitOnClick,
      range,
      selected,
      multiselect,
      start,
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
    time = time.offset(index);

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
          .offset(index);
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
    const {onTimeSelected, selected, range} = this.props;
    const selectedOrRangeSelected = (
      time.equals(selected) ||
      (range && range.getStart().equals(time) && range.getEnd().equals(time))
    );

    return <button
      key={`${time.toString()}-quickoption`}
      className={`quickOption ${selectedOrRangeSelected ? 'selected' : ''}`}
      onClick={() => onTimeSelected(time)}
      onMouseOver={() => this.unitOnMouseOver(time)}
      onMouseOut={() => this.unitOnMouseOut(time)}>
      <i className={icon} />
    </button>;
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
        {time: FuzzyTime.getForever(), name: 'no date', icon: 'fa fa-times'},
      ];
    if (quickOptions.length === 0) {
      return null;
    }
    return <div className="quickOptions">
      {quickOptions.map(qo => this.renderQuickOption(qo.time, qo.name, qo.icon))}
    </div>;
  }

  render() {
    // const {focalPoint} = this.state;
    // const today = FuzzyTime.getCurrent(FuzzyGranularity.DAY);
    // const unitElmts: JSX.Element[] = [<div className="spacer" />];
    const {width, height, viewMode, focalPoint, start, hoverTime} = this.state;
    const {onTimeSelected} = this.props;

    const invalidationPropsForRows = {
      focalPoint,
      viewMode,
      start,
      hoverTime
    };

    return <div className="FuzzyTimeSelect" ref={(ref) => this.rootRef = ref}>
      {this.renderQuickOptions()}
      <div className="viewModeSelector">
        {this.renderViewModeButton(ViewMode.DAILY, 'days/weeks', 'qqico qqico-cal-day')}
        {this.renderViewModeButton(ViewMode.YEARLY, 'months/years', 'qqico qqico-cal-year')}
      </div>
      <ReactVirtualized.List
        key={'virtualScroll' + viewMode}
        className="scrollContainer"
        width={width}
        height={height}
        rowHeight={this.getRowHeight}
        rowCount={1000}
        rowRenderer={this.renderRow}
        style={{}}
        {...invalidationPropsForRows}
      />
      <div className="controls">
        <UIButton
          key="none-button"
          className="noneButton"
          onClick={() => onTimeSelected(null)}>
          Cancel
        </UIButton>
        <UIButton
          key="cancel-button"
          className="cancelButton"
          styling={Stylings.GO}
          onClick={this.onCancelClick}>
          Clear
        </UIButton>
      </div>
    </div>;
  }

  private onResize() {
    const newWidth = (ReactDOM.findDOMNode(this.rootRef) as HTMLDivElement).clientWidth;
    const newHeight = (ReactDOM.findDOMNode(this.rootRef) as HTMLDivElement).clientHeight - 110;
    const {width, height} = this.state;
    if (newWidth !== width || newHeight !== height) {
      this.setState({width: newWidth, height: newHeight});
    }
  }

  private scrollToFocalPoint() {
    const {focalPoint} = this.state;
    if (focalPoint) {
      // const timenavscrollEl = ReactDOM.findDOMNode(this.scrollContainerEl) as Element;
      // const focalPointEl = ReactDOM.findDOMNode(this.focalPointComponent) as Element;
      // if (timenavscrollEl && focalPointEl) {
      //   const timenavscrollOffsetTop = timenavscrollEl.getBoundingClientRect().top + document.body.scrollTop;
      //   const focalPointOffsetTop = focalPointEl.getBoundingClientRect().top + document.body.scrollTop;
      //   const scrollTo = focalPointOffsetTop - timenavscrollOffsetTop + $timenavscroll.scrollTop() - 200;
      //   $timenavscroll.scrollTop(scrollTo);
      // }
    }
  }
}

export interface FuzzyTimeSelectProps {
  focalPoint?: FuzzyTime;
  onTimeSelected: (time: FuzzyTime) => void;
  onTasksDropped?: (tasks: Task[], time: FuzzyTime) => void;
  selected?: FuzzyTime;
  range?: FuzzyTimeRange;
  multiselect?: boolean;
  onRangeSelected?: (range: FuzzyTimeRange) => void;
  quickOptions?: {time: FuzzyTime, name: string, icon: string}[];
}

export interface FuzzyTimeSelectState {
  focalPoint: FuzzyTime;
  viewMode: ViewMode;
  width: number;
  height: number;
  // Indicates that a range selection is in progress
  midselect: boolean;
  start?: FuzzyTime;
  hoverTime?: FuzzyTime;
  initialSelected?: FuzzyTime;
  initialRange?: FuzzyTimeRange;
}

export default FuzzyTimeSelect;
