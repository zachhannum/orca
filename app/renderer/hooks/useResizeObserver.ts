import { useRef, useState, useCallback, RefObject, useEffect } from 'react';
import { throttle } from 'lodash';

const useResizeObserver = (
  ref: RefObject<HTMLElement>,
  wait: number,
  callback?: (height: number, width: number) => void
) => {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const onResize = (entries: ResizeObserverEntry[]) => {
    if (!Array.isArray(entries)) {
      return;
    }
    const entry = entries[0];
    setWidth(entry.contentRect.width);
    setHeight(entry.contentRect.height);

    if (callbackRef.current) {
      callbackRef.current(entry.contentRect.height, entry.contentRect.width);
    }
  };

  const handleResize = throttle(onResize, wait);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(ref.current);
  }, []);

  return [width, height];
};

export default useResizeObserver;
