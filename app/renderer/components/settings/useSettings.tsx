import { useEffect } from 'react';
import { Settings } from 'types/types';
import useStore from 'renderer/store/useStore';

export const useSettings = () => {
  const setSettings = useStore((state) => state.setSettings);
  useEffect(() => {
    window.appApi.onSettings((loadedSettings: Settings) => {
      setSettings(loadedSettings);
    });
  }, []);
};
