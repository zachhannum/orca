import { SectionType } from 'types/types';
import useStore from '../store/useStore';

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

const updateSectionName = (oldName: string, newName: string) => {
  if (oldName !== newName) {
    const { content, changeSectionName } = useStore.getState();
    const section = content.find((s) => s.name === oldName);
    if (section) {
      console.log(`updating name to ${newName}`);
      const newSection = { ...section, name: newName}
      changeSectionName(oldName, newSection);
      const updatedContent = useStore.getState().content;
      updatedContent.forEach((section) => {
        console.log(section.name);
      });
    }
  }
};

const addNewSection = () => {
  const defaultNameBase = 'Untitled';
  const { content } = useStore.getState();
  let i = 1;
  let name = defaultNameBase;
  // eslint-disable-next-line @typescript-eslint/no-loop-func
  while (content.find((p) => p.name === name) !== undefined) {
    name = `${defaultNameBase}${i}`;
    i += 1;
  }
  const { updateOrAddSection } = useStore.getState();
  updateOrAddSection({
    name,
    content: '',
    type: SectionType.maincontent,
  });
};

export { saveProject, updateSectionName, addNewSection };
