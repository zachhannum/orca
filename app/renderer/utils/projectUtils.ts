import { Section, SectionType } from 'types/types';
import useStore from '../store/useStore';
import { findItemDeep } from '../components/TreeView/utilities';

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
  console.log(projectContents);
  window.projectApi.saveProject({
    projectContent: projectContents,
    folderPath,
    fileName,
  });
};

const updateSectionName = (oldName: string, newName: string) => {
  if (oldName !== newName) {
    const { content, changeSectionName } = useStore.getState();
    const section = findItemDeep(content, oldName);
    console.log(`Attempting to update ${oldName} to ${newName}`);
    if (section) {
      console.log(`updating name to ${newName}`);
      changeSectionName(oldName, newName);
    }
  }
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
  const { updateOrAddSection } = useStore.getState();
  updateOrAddSection({
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
