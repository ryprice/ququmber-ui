import * as jquery from "jquery";
import {times} from "lodash";
import * as React from "react";
import * as ReactDOM from  'react-dom';
import * as ReactVirtualized from 'react-virtualized';

import {FuzzyGranularity, FuzzyTime, FuzzyTimeRange, Task} from "ququmber-api";
import {parseHumanReadableFuzzyTime} from "ququmber-api";

import FuzzyTimeMonthUnit from "ququmber-ui/fuzzyTime/FuzzyTimeMonthUnit";
import {FuzzyTimeSelectUnitProps} from "ququmber-ui/fuzzyTime/FuzzyTimeSelectUnit";
import FuzzyTimeYearUnit from "ququmber-ui/fuzzyTime/FuzzyTimeYearUnit";
import UITextInput from "ququmber-ui/controls/UITextInput";
import {weeksInMonth} from "ququmber-ui/utils/dateUtils";

export enum ViewMode {
  YEARLY,
  DAILY
};

const initialState = (props: FuzzyTimeSelectProps): FuzzyTimeSelectState => {
  const focalPoint = (
    this.props.focalPoint ||
    (
      this.props.selected &&
      this.props.selected.compareTo(FuzzyTime.getForever()) &&
      this.props.selected
    ) ||
    (this.props.range && this.props.range.getStart())
    || FuzzyTime.getCurrent(FuzzyGranularity.DAY)
  );
  return {
    focalPoint,
    width: 0,
    height: 0,
    midselect: false,
    viewMode: focalPoint.getGranularity() === FuzzyGranularity.YEAR
      ? ViewMode.YEARLY
      : ViewMode.DAILY,
    initialSelected: props.selected,
    initialRange: props.range
  };
};

export class FuzzyTimeSelect extends React.Component<FuzzyTimeSelectProps, FuzzyTimeSelectState> {

  private scrollContainerEl: Element;

  readonly state: FuzzyTimeSelectState = initialState(this.props);

  constructor(props: FuzzyTimeSelectProps, context?: any) {
    super(props, context);

    this.unitOnMouseOver = this.unitOnMouseOver.bind(this);
    this.unitOnMouseOut = this.unitOnMouseOut.bind(this);
    this.unitOnClick = this.unitOnClick.bind(this);
  }

  public renderViewModeButton(viewMode: ViewMode, text: string) {
    return <button
      className={this.state.viewMode === viewMode ? 'selected' : ''}
      onClick={() => this.setState({viewMode})}
    >
      {text}
    </button>;
  }

  private unitOnMouseOver = (t: FuzzyTime) =>
    this.setState({hoverTime: t});

  private unitOnMouseOut = (t: FuzzyTime) =>
    this.setState({hoverTime: null});

  private unitOnClick = (t: FuzzyTime) =>
    this.onDateLaunchClick(t);

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
      style: {},
      granularity: focalPoint.getGranularity(),
      onMouseOver: this.unitOnMouseOver,
      onMouseOut: this.unitOnMouseOut,
      hoverTime
    };
  };

  renderRow(info: {index: number, isScrolling: boolean, style: Object, key: string}) {
    let time = this.state.focalPoint;
    let years = false;
    switch(this.state.viewMode) {
      case ViewMode.DAILY:
        time = time.getParent(FuzzyGranularity.MONTH);
        break;
      case ViewMode.YEARLY:
        const newTime = time.getTime();
        const year = newTime.getUTCFullYear();
        newTime.setUTCFullYear(year - (year % 4));
        time = new FuzzyTime(newTime, FuzzyGranularity.YEAR);
        years = true;
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

  public getRowHeight(info: {index: number}) {
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

  private root: HTMLDivElement;

  public render(): JSX.Element {
    // const {focalPoint} = this.state;
    // const today = FuzzyTime.getCurrent(FuzzyGranularity.DAY);
    // const unitElmts: JSX.Element[] = [<div className="spacer" />];
    const {width, height, viewMode} = this.state;
    const {onTimeSelected, onRangeSelected} = this.props;

    return <div className="FuzzyTimeSelect" ref={(ref) => this.root = ref}>
      <div className="viewModeSelector">
        {this.renderViewModeButton(ViewMode.YEARLY, 'Yearly')}
        {this.renderViewModeButton(ViewMode.DAILY, 'Daily')}
      </div>
      <ReactVirtualized.List
        key={'virtualScroll' + viewMode}
        className="scrollContainer"
        width={width}
        height={height}
        rowHeight={(info) => this.getRowHeight(info)}
        rowCount={1000}
        rowRenderer={(info) => this.renderRow(info)}
        style={null}
      />
      <div className="controls">
        <button
          className="noneButton"
          onClick={() => onTimeSelected(null)}>
          Cancel
        </button>
        <button
          className="cancelButton"
          onClick={() => {
            const {initialSelected, initialRange} = this.state;
            if (!this.props.range) {
              onTimeSelected(initialSelected);
            } else {
              onRangeSelected(initialRange);
            }
          }}>
          Clear
        </button>
      </div>
    </div>;
  }

  componentDidUpdate() {
    if (this.shouldScrollToFocalPoint) {
      this.scrollToFocalPoint();
      this.shouldScrollToFocalPoint = false;
    }
  }

  private shouldScrollToFocalPoint = false;

  private onResizeTimerId: number = null;
  componentDidMount() {
    this.onResizeTimerId = window.setInterval(() => this.onResize(), 150);
    this.onResize();
    // this.scrollToFocalPoint();
  }

  componentWillUnmount() {
    window.clearInterval(this.onResizeTimerId);
  }

  onResize() {
    const newWidth = (ReactDOM.findDOMNode(this.root) as HTMLDivElement).clientWidth;
    const newHeight = (ReactDOM.findDOMNode(this.root) as HTMLDivElement).clientHeight - 110;
    const {width, height} = this.state;
    if (newWidth !== width || newHeight !== height) {
      this.setState({width: newWidth, height: newHeight});
    }
  }

  private scrollToFocalPoint() {
    const {focalPoint} = this.state;
    if (focalPoint) {
      const $timenavscroll = jquery(this.scrollContainerEl);
      const $focalPoint = jquery(this.focalPointComponent);
      if ($timenavscroll.length > 0 && $focalPoint.length > 0) {
        const scrollTo = $focalPoint.offset().top - $timenavscroll.offset().top + $timenavscroll.scrollTop() - 200;
        $timenavscroll.scrollTop(scrollTo);
      }
    }
  }

  private focalPointComponent: HTMLElement;
  private receiveFocalPointRef(component: HTMLElement, time: FuzzyTime) {
    this.focalPointComponent = component;
  }

  private onSearchKeyPress(query: string) {
    const searchDate = parseHumanReadableFuzzyTime(query);
    if (searchDate) {
      this.setState({focalPoint: searchDate});
      this.shouldScrollToFocalPoint = true;
      this.forceUpdate();
    }
  }

  private onDateLaunchClick(date: FuzzyTime) {
    if (this.props.multiselect) {
      if (!this.state.midselect) {
        this.setState({start: date, midselect: true});
      } else {
        this.props.onRangeSelected(new FuzzyTimeRange(this.state.start, date));
        this.setState({start: undefined, midselect: false});
      }
    } else {
      this.props.onTimeSelected(date);
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
