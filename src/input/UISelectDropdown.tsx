import {css} from '@emotion/react';
import {map} from 'lodash';
import {forwardRef, ReactChild} from 'react';

import Colors from 'ququmber-ui/Colors';
import UIDropdown from 'ququmber-ui/popup/UIDropdown';

const styles = {
  root: css`
    background: ${Colors.WHITE};
    width: 100%;
  `,

  item: css`
    padding: 0.3em;
    cursor: pointer;

    &.selected {
      background: ${Colors.OPTION_SELECTED};

      &:hover,
      &.hover {
        background: ${Colors.OPTION_SELECTEDHOVER};
      }
    }

    &:hover,
    &.hover {
      background: ${Colors.OPTION_HOVER};
    }
  `
};

const UISelectDropdown = forwardRef<HTMLDivElement, UISelectDropdownProps>((
  props: UISelectDropdownProps,
  ref
) => {
  const {
    open, className, options, onSelect,
    hoverIndex, onClose, selected, renderDropdownContents
  } = props;

  const optionsNodes = map(options, (option, index) => {
    let itemClassName = hoverIndex === index ? 'hover ' : '';
    itemClassName += selected === option.value ? 'selected ' : '';

    return <div
      key={option.value}
      onClick={onSelect != null ? () => onSelect(option.value) : null}
      css={styles.item}
      className={itemClassName}>
      {option.icon != null && <>
        <i className={option.icon} />
        &nbsp;&nbsp;
      </>}
      {option.name}
    </div>;
  });

  if (renderDropdownContents) {
    return <UIDropdown open={open} onClose={onClose} ref={ref}>
      {renderDropdownContents(optionsNodes)}
    </UIDropdown>;
  }

  return <UIDropdown open={open} onClose={onClose} ref={ref}>
    <div css={styles.root} className={className}>
      {optionsNodes}
    </div>
  </UIDropdown>;
});

export type UISelectDropdownOption = {
  icon?: string;
  name: ReactChild | string;
  value?: string;
  color?: string;
};

export type UISelectDropdownProps = {
  options: UISelectDropdownOption[];
  onSelect?: (key: string) => void;
  className?: string;
  open?: boolean;
  hoverIndex?: number;
  onClose?: () => void;
  selected?: string;
  renderDropdownContents?: (children: ReactChild[]) => ReactChild;
};

export default UISelectDropdown;
