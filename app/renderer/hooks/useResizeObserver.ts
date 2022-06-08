import { useLayoutEffect, useState, useMemo, RefObject } from 'react';
import { throttle } from 'lodash';

const useResizeObserver = (
  ref: RefObject<HTMLElement>,
  wait: number,
  callback?: (height: number, width: number) => void
) => {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  const onResize = (entries: ResizeObserverEntry[]) => {
    if (!Array.isArray(entries)) {
      return;
    }

    const entry = entries[0];
    setWidth(entry.contentRect.width);
    setHeight(entry.contentRect.height);

    if (callback) {
      callback(entry.contentRect.height, entry.contentRect.width);
    }
  };

  const handleResize = useMemo(() => throttle(onResize, wait), [callback]);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const RO = new ResizeObserver((entries) => handleResize(entries));
    RO.observe(ref.current);
  }, [ref, handleResize]);

  return [width, height];
};

export default useResizeObserver;
