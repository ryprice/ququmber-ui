import * as React from 'react';
import * as ReactDOM from 'react-dom';

const {useCallback, useEffect, useRef} = React;

// https://stackoverflow.com/questions/29321742/react-getting-a-component-from-a-dom-element-for-debugging

function getFiberNodeFromEl(el: Element) {
  const key = Object.keys(el).find(key=>{
    return (
      key.startsWith("__reactFiber$") || // react 17+
      key.startsWith("__reactInternalInstance$") // react <17d
    );
  });
  // @ts-ignore
  const fiber = el[key];
  if (fiber) {
    return fiber.return;
  }
  return null;
}

// Determines whether el contains maybeChildEl using React Fiber, rather than the DOM API.
// This is necessary because the DOM API doesn't work for React portals.
function elContainsUsingFiber(el: Element, maybeChildEl: Element) {
  const parentFiberNode = getFiberNodeFromEl(el);
  const maybeChildFiberNode = getFiberNodeFromEl(maybeChildEl);
  
  if (!parentFiberNode || !maybeChildFiberNode) {
    return false;
  }

  let curFiberNode = maybeChildFiberNode.return;
  while (curFiberNode) {
    if (curFiberNode === parentFiberNode) {
      return true;
    }
    curFiberNode = curFiberNode.return;
  }

  return false;
}

const useOnOutsideClick = (
  refs: Array<React.MutableRefObject<any>>,
  onOutsideClick: () => void,
  enabled: boolean = true,
) => {
  const onOutsideClickRef = useRef(onOutsideClick);
  onOutsideClickRef.current = onOutsideClick;
  const windowClickHandler = useCallback((e: MouseEvent) => {
    const childEl = e.target as Element;
    if (childEl) {
      let insideClick = false;
      refs.forEach(ref => {
        const el = ReactDOM.findDOMNode(ref.current) as Element;
        // using fiber should always work, but since it's a hack on undocumented react apis
        // start by checking the DOM API as a fallback
        if ((el && el.contains(childEl)) || (ref.current && elContainsUsingFiber(ref.current, childEl))) {
          insideClick = true;
        }
      });
      if (insideClick) {
        return true;
      }
    }
    onOutsideClickRef.current && onOutsideClickRef.current();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...refs]);

  useEffect(() => {
    if (enabled) {
      window.addEventListener('mousedown', windowClickHandler, false);
      return () => {
        window.removeEventListener('mousedown', windowClickHandler);
      };
    }
  }, [enabled, windowClickHandler]);
};

export default useOnOutsideClick;
