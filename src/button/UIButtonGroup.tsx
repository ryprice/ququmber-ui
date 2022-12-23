import * as React from 'react';
import {SerializedStyles} from '@emotion/react';

import Stylings from 'ququmber-ui/Stylings';

export const UIButtonGroupButton = (props: UIButtonGroupButtonProps) => {
  const {children, style, className, styling, onClick, selected, css} = props;
  return (
    <button
      css={css}
      onClick={onClick}
      className={
        `UIButtonGroupButton styling-${styling} ${selected ? 'selected' : ''} ${className != null ? className : ''}`
      }
      style={style}>
      {children}
    </button>
  );
};

UIButtonGroupButton.defaultProps = {
  styling: Stylings.CONTROL,
};

export type UIButtonGroupButtonProps = {
  className?: string;
  style?: object;
  children?: React.ReactNode;
  disabled?: boolean;
  styling?: Stylings;
  onClick?: () => void;
  id?: string;
  loading?: boolean;
  selected?: boolean;
  css?: SerializedStyles;
};

const UIButtonGroup = (props: UIButtonGroupProps) => {
  const {children, className, style} = props;

  return (
    <div
      className={`UIButtonGroup ${className != null ? className : ''}`}
      style={style}>
      {children}
    </div>
  );
};

export type UIButtonGroupProps = {
  className?: string;
  children?: React.ReactNode;
  style?: object;
};

export default UIButtonGroup;
