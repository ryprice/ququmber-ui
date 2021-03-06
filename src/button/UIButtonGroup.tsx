import * as React from 'react';

import Stylings from 'ququmber-ui/Stylings';

export const UIButtonGroupButton = (props: UIButtonGroupButtonProps) => {
  const {children, style, className, styling, onClick, selected} = props;
  return (
    <button
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
};

const UIButtonGroup =(props: UIButtonGroupProps) => {
  const {children, className, style} = props;

  React.Children.toArray(children).forEach(child => {
    if ((child as any).type !== UIButtonGroupButton) {
      throw new Error('Child must be type UIButtonGroupButton');
    }
  });

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
