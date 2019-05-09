import * as React from 'react';
import * as ReactDOM from 'react-dom';

const {useCallback, useEffect, useMemo} = React;

const useOnOutsideClick = (
  refs: React.MutableRefObject<any>[],
  onOutsideClick: () => void
) => {

  const memoRefs = useMemo(() => refs, refs);

  const windowClickHandler = useCallback((e: MouseEvent) => {
    const els = memoRefs.map(ref => ReactDOM.findDOMNode(ref.current)) as Element[];
    const childEl = e.target as Element;
    if (childEl) {
      let insideClick = false;
      els.forEach(el => {
        if (el && el.contains(childEl)) {
          insideClick = true;
        }
      });
      if (insideClick) {
        return true;
      }
    }
    onOutsideClick();
  }, [memoRefs, onOutsideClick]);

  useEffect(() => {
    window.addEventListener('mousedown', windowClickHandler, false);
    return () => {
      window.removeEventListener('mousedown', windowClickHandler);
    };
  });
};

export default useOnOutsideClick;
