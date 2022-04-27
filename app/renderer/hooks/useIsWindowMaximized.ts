import { useState, useEffect } from 'react';

const useIsWindowMaxized = (): boolean => {
  const [isWindowMaximized, setIsWindowMaximized] = useState(false);

  useEffect(() => {
    window.electron.ipcRenderer.on('window', (arg) => {
      if (arg === 'maximize') {
        setIsWindowMaximized(true);
      } else if (arg === 'unmaximize') {
        setIsWindowMaximized(false);
      }
    });
  }, []);
  return isWindowMaximized;
};

export default useIsWindowMaxized;
