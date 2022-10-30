import { useEffect } from 'react';

const useOnWindowResize = (handler: (event: UIEvent) => void) => {
  useEffect(() => {
    const listener = (event: UIEvent) => {
      handler(event);
    };
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [handler]);
};

export default useOnWindowResize;
