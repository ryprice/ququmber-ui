import * as React from 'react';

import UILoading from 'ququmber-ui/progress/UILoading';
import Stylings from 'ququmber-ui/Stylings';

const UIButton = React.forwardRef<HTMLButtonElement, UIButtonProps>((props, ref) => {
  const {className, onClick, children, style, styling, disabled, id, loading} = props;

  return (
    <button
      ref={ref}
      className={`UIButton ${className != null ? className : ''} styling-${styling || Stylings.CONTROL}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
      id={id}
    >
      <span className="inner">{children}</span>
      {loading && (
        <div className="loadingContainer">
          <UILoading />
        </div>
      )}
    </button>
  );
});

export type UIButtonProps = {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  style?: object;
  styling?: Stylings;
  disabled?: boolean;
  id?: string;
  loading?: boolean;
};

export default UIButton;
