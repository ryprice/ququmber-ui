import {SerializedStyles, css} from '@emotion/react';
import {debounce, filter, find, includes, map} from 'lodash';
import {MutableRefObject, Component} from 'react';
import * as ReactDOM from 'react-dom';
import TetherComponent from 'react-tether';

import UITag from 'ququmber-ui/chip/UITag';
import Colors from 'ququmber-ui/Colors';
import {UIAbstractInputStyle} from 'ququmber-ui/input/UIAbstractInput';
import UISelectDropdown from 'ququmber-ui/input/UISelectDropdown';

const styles = {
  root: css`
    position: relative;
    overflow: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: .3em;
  `,
  tag: css`
    flex-shrink: 0;
    flex-grow: 0;
    float: none;
  `,
  input: css`
    border: 0;
    padding: .1em;
    background: transparent;
    outline: 0;
    flex-grow: 1;
    width: 60px;
    display: flex;
    flex-shrink: 1;
    cursor: pointer;

    &:focus {
      cursor: text;
    }

    &::placeholder {
      color: ${Colors.QUIET};
    }
  `,
  downArrow: css`
    align-self: center;
  `,
  asControl: css`
    background: ${Colors.CONTROL};
  `,
  asInline: css`
    background: ${Colors.CONTROL};

    .downArrow {
      display: none;
    }
  `,
  dropdown: css`
    min-width: 300px;
    display: block;
  `,
};

export class UIMultiInput extends Component<UIMultiInputProps, UIMultiInputState> {

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
    const {options} = this.props;
    const option = find(options, (o) => o.value === value);
    if (option.canRemove !== false) {
      this.props.onOptionRemove(value);
    }
  }

  private onOptionAdd(value: string) {
    const {options, onOptionAdd} = this.props;
    this.tagsInput.value = '';
    const option = find(options, {value});
    if (option) {
      onOptionAdd(value);
    }
    this.setState({dropdownOpen: false, hoverIndex: undefined});
  }

  private lastValue = '';

  private onKeyUp(event: any) {
    const {hoverIndex} = this.state;
    const {onQueryChanged} = this.props;
    switch (event.keyCode) {
      case 8:
        if (this.lastValue.length < 1) {
          const selected = this.props.selected;
          if (selected.length > 0) {
            this.onOptionRemoved(selected[selected.length - 1]);
          }
        }
        break;

      case 13:
        this.onOptionAdd(this.getFilteredUnselectedOptions()[hoverIndex].value);
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
      this.tagsInput.value = '';
      this.props.onQueryChanged && this.props.onQueryChanged('');
    }
  }

  boundWindowClickHandler: (e: MouseEvent) => void;

  public componentDidMount() {
    window.addEventListener('click', this.boundWindowClickHandler, false);
    if (this.props.autofocus) {
      this.setState({dropdownOpen: true});
    }
  }


  public componentWillUnmount() {
    window.removeEventListener('click', this.boundWindowClickHandler);
  }

  private readonly getFilteredUnselectedOptions = () => {
    const {options, selected, shouldFilterOptions} = this.props;
    const query = this.tagsInput ? this.tagsInput.value.toLowerCase() : '';
    return filter(options, (option) => {
      if (option.hiddenFromDropdown === true) {
        return false;
      }
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
      key="UIMultiInput-defaultRenderItem"
      css={styles.tag}
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
      asInline,
      transparentBackground,
      autofocus
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

    const input = <div
      css={[
        UIAbstractInputStyle,
        styles.root,
        asInline ? styles.asInline : styles.asControl,
      ]}
      className={className}
      style={transparentBackground ? {
        background: 'transparent',
        marginRight: '3px',
        marginLeft: '-3px'
      } : null}>
      {map(selectedOptions, (option: UIMultiInputOption) =>
        renderItem ? renderItem(option, true) : this.defaultRenderItem(option))
      }
      <input
        css={styles.input}
        disabled={disabled}
        style={transparentBackground ? {background: 'transparent'} : {}}
        type="text"
        placeholder={placeholder}
        onClick={() => this.setState({dropdownOpen: true})}
        onFocus={() => this.setState({dropdownOpen: true})}
        onKeyUp={(e: any) => this.onKeyUp(e)}
        ref={(el: any) => this.receiveTagsInputEl(el)}
        autoFocus={autofocus}
      />
      <span className="octicon octicon-chevron-down downArrow" css={styles.downArrow} key="down-arrow" />
    </div>;

    return <div>
      {input}
      {dropdownOpen && <TetherComponent
        attachment={attachment || 'top left'}
        targetAttachment={targetAttachment || 'bottom left'}
        renderTarget={(tetherRef: MutableRefObject<HTMLDivElement>) => (
          <div ref={tetherRef} />
        )}
        renderElement={(tetherRef: MutableRefObject<HTMLDivElement>) => (
          <UISelectDropdown
            ref={tetherRef}
            css={styles.dropdown}
            options={filteredUnselectedOptions.slice(0, 10).map(option => ({
              ...option,
              name: renderItem ? renderItem(option, false) : option.name
            }))}
            hoverIndex={hoverIndex}
            onSelect={(value) => this.onOptionAdd(value)}
            open={this.state.dropdownOpen}
            renderDropdownContents={renderDropdownContents}
          />
        )}
      />}
    </div>;
  }
}

export type UIMultiInputOption = {
  name: string;
  value: string;
  color?: string;
  canRemove?: boolean;
  hiddenFromDropdown?: boolean;
};

export type UIMultiInputProps = {
  options: UIMultiInputOption[];
  selected: string[];
  onOptionAdd: (value: string) => any;
  onOptionRemove: (value: string) => any;
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
  css?: SerializedStyles;
  transparentBackground?: boolean;
  autofocus?: boolean;
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
