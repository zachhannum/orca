import { RefObject, useEffect } from 'react';

const useOnClickOutside = (
  handler: (event: MouseEvent | TouchEvent) => void,
  ...refs: RefObject<HTMLElement>[]
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      let skip = false;
      refs.forEach((ref) => {
        if (!ref.current || ref.current.contains(event.target as Node)) {
          skip = true;
        }
      });
      if (!skip) {
        handler(event);
      }
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler]);
};

export default useOnClickOutside;
