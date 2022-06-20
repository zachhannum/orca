import { Section, SectionType } from 'types/types';
import useStore from '../store/useStore';
import { findItemDeep, changeItemId } from '../components/TreeView/utilities';

const saveProject = () => {
  const projectContents = {
    bookTitle: useStore.getState().bookTitle,
    bookSubTitle: useStore.getState().bookSubTitle,
    authorName: useStore.getState().authorName,
    seriesName: useStore.getState().seriesName,
    ISBN: useStore.getState().ISBN,
    language: useStore.getState().language,
    publisher: useStore.getState().publisher,
    content: useStore.getState().content,
  };
  const folderPath = useStore.getState().projectFolder;
  const fileName = useStore.getState().projectFileName;
  window.projectApi.saveProject({
    projectContent: projectContents,
    folderPath,
    fileName,
  });
};

const updateSectionName = (oldName: string, newName: string): boolean => {
  if (oldName !== newName) {
    const { content, setContentArray } = useStore.getState();
    const section = findItemDeep(content, oldName);
    if (section) {
      const { success, items } = changeItemId(content, oldName, newName);
      if (success) {
        setContentArray(items);
        const {editorStateMap} = useStore.getState();
        const editorState = editorStateMap.get(oldName);
        if(editorState) {
          useStore.getState().setEditorState(newName, editorState);
          useStore.getState().removeEditorState(oldName);
        }
        if(useStore.getState().activeSectionId === oldName) {
          useStore.getState().setActiveSectionId(newName);
        }
      }
      return success;
    }
  }
  return false;
};

const addNewSection = (type: SectionType = SectionType.maincontent) => {
  const { content, setAddingSections } = useStore.getState();
  setAddingSections(true);
  const defaultNameBase = 'Untitled';
  let i = 1;
  let name = defaultNameBase;
  // eslint-disable-next-line @typescript-eslint/no-loop-func
  while (findItemDeep(content, name) !== undefined) {
    name = `${defaultNameBase}${i}`;
    i += 1;
  }
  const { addNewSection } = useStore.getState();
  addNewSection({
    id: name,
    content: '',
    type: type,
    canHaveChildren: type === SectionType.folder ? true : false,
    collapsed: false,
    children: [],
  });
  setTimeout(() => {
    setAddingSections(false);
  }, 10);
};

const addNewFolder = () => {
  addNewSection(SectionType.folder);
};

export { saveProject, updateSectionName, addNewSection, addNewFolder };
