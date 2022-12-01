import { useEffect } from 'react';
import useStore from '../store/useStore';

export const useAppVersion = () => {
  useEffect(() => {
    console.log('listening for app version...');
    window.appApi
      .appVersion()
      .then((value) => {
        console.log(value);
        const { setVersion } = useStore.getState();
        setVersion(value);
        return null;
      })
      .catch((e) => {
        console.log(e);
      });
  });
};
