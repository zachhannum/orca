import { useEffect } from 'react';

const useOnWheel = (
  handler: (event: WheelEvent) => void,
  ...omitRefs: React.RefObject<HTMLElement>[]
) => {
  useEffect(() => {
    const listener = (event: WheelEvent) => {
      let skip = false;
      if (omitRefs) {
        omitRefs.forEach((ref) => {
          if (!ref.current || ref.current.contains(event.target as Node)) {
            skip = true;
          }
        });
      }
      if (!skip) {
        handler(event);
      }
    };
    document.addEventListener('wheel', listener);
    return () => {
      document.removeEventListener('wheel', listener);
    };
  }, [handler]);
};

export default useOnWheel;
