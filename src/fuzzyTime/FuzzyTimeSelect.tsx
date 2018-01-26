import * as jquery from "jquery";
import {times} from "lodash";
import * as React from "react";
import * as ReactDOM from  'react-dom';
import * as ReactVirtualized from 'react-virtualized';

import {FuzzyGranularity, FuzzyTime, FuzzyTimeRange, Task} from "ququmber-api";
import {parseHumanReadableFuzzyTime} from "ququmber-api";

import FuzzyTimeMonthUnit from "ququmber-ui/fuzzyTime/FuzzyTimeMonthUnit";
import {FuzzyTimeSelectUnitProps} from "ququmber-ui/fuzzyTime/FuzzyTimeSelectUnit";
import FuzzyTimeYeargroupUnit from "ququmber-ui/fuzzyTime/FuzzyTimeYeargroupUnit";
import FuzzyTimeYearUnit from "ququmber-ui/fuzzyTime/FuzzyTimeYearUnit";
import {UITextInput} from "ququmber-ui/controls/UITextInput";
import {weeksInMonth} from "ququmber-ui/utils/dateUtils";

export class FuzzyTimeSelect extends React.Component<FuzzyTimeSelectProps, FuzzyTimeSelectState> {

  private scrollContainerEl: Element;
  constructor(props: FuzzyTimeSelectProps, context?: any) {
    super(props, context);
    this.state = {
      focalPoint: (
        this.props.focalPoint ||
        this.props.selected ||
        (this.props.range && this.props.range.getStart())
        || FuzzyTime.getCurrent(FuzzyGranularity.DAY)
      ),
      width: 0,
      height: 0,
      midselect: false,
    };
  }

  public renderGranularityItem(granularity: FuzzyGranularity) {
    return <li
      className={this.state.focalPoint.getGranularity() === granularity ? 'selected' : ''}
      onClick={() => this.setState({focalPoint: this.state.focalPoint.withGranularity(granularity)})}
    >
      {granularity.getName()}
    </li>;
  }

  public getUnitProps(): FuzzyTimeSelectUnitProps {
    const {range, selected, multiselect, onTasksDropped} = this.props;
    const {focalPoint, start} = this.state;
    return {
      time: null,
      disabled: false,
      onClick: (time) => this.onDateLaunchClick(time),
      range,
      selected,
      multiselect,
      start,
      focalPoint,
      onTasksDropped,
      style: {}
    };
  };

  renderRow(info: {index: number, isScrolling: boolean, style: Object, key: string}) {
    let time = this.state.focalPoint;
    let years = false;
    switch(this.state.focalPoint.getGranularity()) {
      case FuzzyGranularity.DAY:
      case FuzzyGranularity.WEEK:
        time = time.getParent(FuzzyGranularity.MONTH);
        break;
      case FuzzyGranularity.MONTH:
        time = time.getParent(FuzzyGranularity.YEAR);
        break;
      case FuzzyGranularity.YEAR:
        const newTime = time.getTime();
        const year = newTime.getUTCFullYear();
        newTime.setUTCFullYear(year - (year % 4));
        time = new FuzzyTime(newTime, FuzzyGranularity.YEAR);
        years = true;
        break;
      case FuzzyGranularity.FOREVER:
        years = true;
    }

    const {index, key, style} = info;
    times(Math.abs(index), () => {
      if (years) {
        const newTime = time.getTime();
        newTime.setUTCFullYear(newTime.getUTCFullYear() + 4 * index);
        time = new FuzzyTime(newTime, FuzzyGranularity.YEAR);
      } else {
        if (index > 0) time = time.getNext();
        else time = time.getPrev();
      }
    });

    switch(time.getGranularity()) {
      case FuzzyGranularity.MONTH:
        return <FuzzyTimeMonthUnit
          {...this.getUnitProps()}
          key={key}
          time={time}
          style={style}
        />;

      case FuzzyGranularity.YEAR:
        if (years) {
          return <FuzzyTimeYeargroupUnit
            {...this.getUnitProps()}
            key={key}
            time={time}
            style={style}
          />;

        } else {
          return <FuzzyTimeYearUnit
            {...this.getUnitProps()}
            key={key}
            time={time}
            style={style}
          />;
        }
      case FuzzyGranularity.FOREVER:
        return <div style={style}>Forever</div>;
    }
    return <div key={key} style={style}>{index}</div>;
  }

  public getRowHeight(info: {index: number}) {
    const {index} = info;
    switch(this.state.focalPoint.getGranularity()) {
      case FuzzyGranularity.DAY:
      case FuzzyGranularity.WEEK:
        let month = this.state.focalPoint.getParent(FuzzyGranularity.MONTH);
        times(Math.abs(index), () => {
          if (index > 0) month = month.getNext();
          else month = month.getPrev();
        });
        return (32 + 26 * weeksInMonth(
          month.getTime().getUTCMonth(),
          month.getTime().getUTCFullYear()
        ));

      case FuzzyGranularity.MONTH:
        return 120;

      case FuzzyGranularity.YEAR:
        return 30;

      case FuzzyGranularity.FOREVER:
        return 30;
    }
  }

  private root: HTMLDivElement;

  public render(): JSX.Element {
    // const {focalPoint} = this.state;
    // const today = FuzzyTime.getCurrent(FuzzyGranularity.DAY);
    // const unitElmts: JSX.Element[] = [<div className="spacer" />];
    const {width, height} = this.state;
    return <div className="FuzzyTimeSelect" ref={(ref) => this.root = ref}>
      <div className="granularitySelector"><ol>
        {this.renderGranularityItem(FuzzyGranularity.YEAR)}
        {this.renderGranularityItem(FuzzyGranularity.MONTH)}
        {this.renderGranularityItem(FuzzyGranularity.WEEK)}
        {this.renderGranularityItem(FuzzyGranularity.DAY)}
      </ol></div>
      <ReactVirtualized.List
        key={'virtualScroll' + this.state.focalPoint.getGranularity().getKey()}
        className="scrollContainer"
        width={width}
        height={height}
        rowHeight={(info) => this.getRowHeight(info)}
        rowCount={100}
        rowRenderer={(info) => this.renderRow(info)}
        style={null}
      />
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
    const newWidth = ReactDOM.findDOMNode(this.root).clientWidth;
    const newHeight = ReactDOM.findDOMNode(this.root).clientHeight - 56;
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
  width: number;
  height: number;
  // Indicates that a range selection is in progress
  midselect: boolean;
  start?: FuzzyTime;
}

export default FuzzyTimeSelect;
