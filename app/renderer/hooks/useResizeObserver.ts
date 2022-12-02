import { useRef, useState, useMemo, RefObject, useEffect } from 'react';
import { debounce, throttle } from 'lodash';

const useResizeObserver = (
  ref: RefObject<HTMLElement>,
  wait: number,
  callback?: (height: number, width: number) => void
) => {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  const resizeObserver = useRef(
    new ResizeObserver((entries) => handleResize(entries))
  );

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

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    resizeObserver.current.observe(ref.current);
  }, []);

  return [width, height];
};

export default useResizeObserver;
