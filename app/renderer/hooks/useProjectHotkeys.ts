import { useEffect, useCallback, useMemo } from 'react';
import useStore from '../store/useStore';
import { saveProject } from '../project';

const useProjectHotkeys = () => {
  const { setGenerateBookModalOpen, setPreviewEnabled, setNewBookModalOpen } =
    useStore.getState();
  const isProjectOpen = useStore((state) => state.isProjectOpen);
  const isPreviewEnabled = useStore((state) => state.previewEnabled);
  const activeSectionId = useStore((state) => state.activeSectionId);

  const shortcuts = useMemo(
    () => ({
      o: window.projectApi.openProject,
      g: () => {
        if (isProjectOpen) {
          setGenerateBookModalOpen(true);
        }
      },
      s: saveProject,
      n: () => {
        setNewBookModalOpen(true);
      },
      p: () => {
        if (isProjectOpen && activeSectionId !== '') {
          setPreviewEnabled(!isPreviewEnabled);
        }
      },
    }),
    [isProjectOpen, isPreviewEnabled, activeSectionId]
  );
  const handleKeypress = useCallback(
    (event: KeyboardEvent) => {
      const commandKeyPressed =
        window.windowApi.os() === 'darwin' ? event.metaKey : event.ctrlKey;
      if (commandKeyPressed) {
        if (event.key in shortcuts) {
          shortcuts[event.key]();
        }
      }
    },
    [isProjectOpen, isPreviewEnabled, activeSectionId]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeypress);
    return () => {
      document.removeEventListener('keydown', handleKeypress);
    };
  }, [handleKeypress]);
};

export default useProjectHotkeys;
