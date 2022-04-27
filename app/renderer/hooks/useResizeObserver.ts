import { useLayoutEffect, useState, useCallback, RefObject } from 'react';

const useResizeObserver = (
  ref: RefObject<HTMLElement>,
  callback?: (height: number, width: number) => void
) => {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!Array.isArray(entries)) {
        return;
      }

      const entry = entries[0];
      setWidth(entry.contentRect.width);
      setHeight(entry.contentRect.height);

      if (callback) {
        callback(entry.contentRect.height, entry.contentRect.width);
      }
    },
    [callback]
  );

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
