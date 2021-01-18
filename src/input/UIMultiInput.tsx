import {debounce, filter, find, includes, map} from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TetherComponent from 'react-tether';

import UITag from 'ququmber-ui/chip/UITag';
import UISelectDropdown from 'ququmber-ui/input/UISelectDropdown';

export class UIMultiInput extends React.Component<UIMultiInputProps, UIMultiInputState> {

  private tagsInput: HTMLInputElement;
  private readonly updateDropdownDebounced: () => void;

  public static defaultProps = {
    shouldFilterOptions: true
  };

  readonly state: UIMultiInputState = {
    dropdownOpen: false,
    hoverIndex: undefined,
  };

  public constructor(props: UIMultiInputProps, context: any) {
    super(props, context);
    this.updateDropdownDebounced = debounce(() => this.updateDropdown(), 100);
    this.boundWindowClickHandler = (e) => this.windowClickHandler(e);
  }

  private receiveTagsInputEl(el: HTMLInputElement) {
    this.tagsInput = el;
  }

  private onOptionRemoved(value: string) {
    this.props.onOptionRemoved(value);
  }

  private onOptionAdded(value: string) {
    const {options, onOptionAdded} = this.props;
    this.tagsInput.value = '';
    const option = find(options, {value});
    if (option) {
      onOptionAdded(value);
    }
    this.setState({dropdownOpen: false, hoverIndex: undefined});
  }

  private lastValue = '';

  private onKeyUp(event: any) {
    const {hoverIndex} = this.state;
    const {onQueryChanged} = this.props;
    switch(event.keyCode) {
      case 8:
        if (this.lastValue.length < 1) {
          const selected = this.props.selected;
          if (selected.length > 0) {
            this.onOptionRemoved(selected[selected.length - 1]);
          }
        }
        break;

      case 13:
        this.onOptionAdded(this.getFilteredUnselectedOptions()[hoverIndex].value);
        break;

      case 38:
        this.setState({
          hoverIndex: hoverIndex != null ? Math.max(hoverIndex - 1,  0) : undefined
        });
        break;

      case 40:
        const optionsCount = this.getFilteredUnselectedOptions().length;
        this.setState({
          hoverIndex: hoverIndex != null ? Math.min(hoverIndex + 1, optionsCount - 1) : 0
        });
        break;
    }
    this.updateDropdownDebounced();

    if (event.keyCode !== 13) {
      this.setState({dropdownOpen: true});
    }
    onQueryChanged && onQueryChanged(this.tagsInput.value);
    this.lastValue = this.tagsInput.value;
  }

  private updateDropdown() {
  }

  private windowClickHandler(e: MouseEvent) {
    const el = ReactDOM.findDOMNode(this);
    const child = e.target as Element;
    if (!(el !== child && el.contains(child))) {
      this.setState({dropdownOpen: false});
    }
  }

  boundWindowClickHandler: (e: MouseEvent) => void;

  public componentDidMount() {
    window.addEventListener('click', this.boundWindowClickHandler, false);
  }


  public componentWillUnmount() {
    window.removeEventListener('click', this.boundWindowClickHandler);
  }

  private readonly getFilteredUnselectedOptions = () => {
    const {options, selected, shouldFilterOptions} = this.props;
    const query = this.tagsInput ? this.tagsInput.value.toLowerCase() : '';
    return filter(options, (option) => {
      if (includes(selected, option.value)) {
        return false;
      }
      if (shouldFilterOptions) {
        return query.length < 1 || (
          option.name != null &&
          option.name.toLowerCase().indexOf(query) > -1
        );
      } else {
        return true;
      }
    });
  };

  private readonly defaultRenderItem = (option: UIMultiInputOption) => {
    return <UITag
      name={option.name}
      onRemoved={() => this.onOptionRemoved(option.value)}
      canRemove={option.canRemove}
    />;
  };

  render() {
    const {
      options,
      selected,
      className,
      placeholder,
      renderItem,
      attachment,
      targetAttachment,
      renderDropdownContents,
      disabled,
      asInline
    } = this.props;
    const {hoverIndex, dropdownOpen} = this.state;

    const selectedOptions = selected
      .map((value) => {
        const foundOption = find(options, (o) => o.value === value);
        const valueOnlyOption = {name: value, value} as UIMultiInputOption;
        const transformedOption = foundOption || valueOnlyOption;
        if (transformedOption.canRemove == null) {
          transformedOption.canRemove = true;
        }
        if (disabled) {
          transformedOption.canRemove = false;
        }
        return transformedOption;
      })
      .sort(sortByCanRemoveComparator);
    const filteredUnselectedOptions = this.getFilteredUnselectedOptions();

    const input = <div className={
      `UIMultiInput ${className || ''} ${dropdownOpen ? 'focus' : ''} ${asInline ? 'asInline' : 'asControl'}`
    }>
      {map(selectedOptions, (option: UIMultiInputOption) =>
        renderItem ? renderItem(option, true) : this.defaultRenderItem(option))
      }
      <input
        disabled={disabled}
        type="text"
        className="UIInput"
        placeholder={placeholder}
        onClick={(e: any) => this.setState({dropdownOpen: true})}
        onFocus={(e: any) => this.setState({dropdownOpen: true})}
        onKeyUp={(e: any) => this.onKeyUp(e)}
        ref={(el: any) => this.receiveTagsInputEl(el)}
      />
      <span className="octicon octicon-chevron-down down-arrow" key="down-arrow" />
    </div>;

    return <div>
      {input}
      {dropdownOpen && <TetherComponent
        attachment={attachment || 'top left'}
        targetAttachment={targetAttachment || 'bottom left'}>
        <div />
        <UISelectDropdown
          className="UIMultiInputDropdown"
          options={filteredUnselectedOptions.slice(0, 10).map(option => ({
            ...option,
            name: renderItem ? renderItem(option, false) : option.name
          }))}
          hoverIndex={hoverIndex}
          onSelect={(value) => this.onOptionAdded(value)}
          open={this.state.dropdownOpen}
          renderDropdownContents={renderDropdownContents}
        />
      </TetherComponent>}
    </div>;
  }
}

export type UIMultiInputOption = {
  name: string;
  value: string;
  color?: string;
  canRemove?: boolean;
};

export type UIMultiInputProps = {
  options: UIMultiInputOption[];
  selected: string[];
  onOptionAdded: (value: string) => any;
  onOptionRemoved: (value: string) => any;
  className?: string;
  placeholder?: string;
  onQueryChanged?: (query: string) => void;
  shouldFilterOptions?: boolean;
  renderItem?: (option: UIMultiInputOption, selected: boolean) => React.ReactChild;
  attachment?: string;
  targetAttachment?: string;
  renderDropdownContents?: (children: React.ReactChild[]) => React.ReactChild;
  disabled?: boolean;
  asInline?: boolean;
};

export type UIMultiInputState = {
  dropdownOpen: boolean;
  hoverIndex: number;
};

const sortByCanRemoveComparator = (a: UIMultiInputOption, b: UIMultiInputOption) => {
  if (a.canRemove === false) {
    if (b.canRemove !== false) {
      return -1;
    }
  }
  if (a.canRemove !== false) {
    if (b.canRemove === false) {
      return 1;
    }
  }
  return 0;
};

export default UIMultiInput;
