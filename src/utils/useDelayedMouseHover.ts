import {delay} from 'lodash';
import * as React from 'react';

const {useCallback, useRef} = React;

const useDelayedMouseHover = (callback: (val: boolean) => any, delayInMs: number, delayOutMs: number) => {
  const overTimerRef = useRef<number>();
  const outTimerRef = useRef<number>();

  const onMouseOver = useCallback(() => {
    if (!overTimerRef.current) {
      overTimerRef.current = delay(() => callback(true), delayInMs);
    }
    if (outTimerRef.current) {
      clearTimeout(outTimerRef.current);
      outTimerRef.current = 0;
    }
  }, [delayInMs, callback]);

  const onMouseOut = useCallback(() => {
    if (!outTimerRef.current) {
      outTimerRef.current = delay(() => callback(false), delayOutMs);
    }
    if (overTimerRef.current) {
      clearTimeout(overTimerRef.current);
      overTimerRef.current = 0;
    }
  }, [delayOutMs, callback]);

  return [onMouseOver, onMouseOut];
};

export default useDelayedMouseHover;
