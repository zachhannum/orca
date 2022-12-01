/* eslint-disable prefer-const */
import { v4 as uuidv4 } from 'uuid';
import { Section, SectionType, Sections } from 'types/types';
import useStore from '../store/useStore';
import { findItemDeep, changeItemName } from '../components/TreeView/utilities';

const saveProject = () => {
  const projectContents = {
    version: useStore.getState().version,
    bookTitle: useStore.getState().bookTitle,
    bookSubTitle: useStore.getState().bookSubTitle,
    authorName: useStore.getState().authorName,
    seriesName: useStore.getState().seriesName,
    ISBN: useStore.getState().ISBN,
    language: useStore.getState().language,
    publisher: useStore.getState().publisher,
    content: useStore.getState().content,
    publishSettings: useStore.getState().publishSettings,
  };
  const folderPath = useStore.getState().projectFolder;
  const fileName = useStore.getState().projectFileName;
  window.projectApi.saveProject({
    projectContent: projectContents,
    folderPath,
    fileName,
  });
  const { setIsProjectDirty } = useStore.getState();
  setIsProjectDirty(false);
};

const updateSectionName = (id: string, newName: string): boolean => {
  const { content, setContentArray } = useStore.getState();
  const section = findItemDeep(content, id);
  if (section) {
    const { success, items } = changeItemName(content, id, newName);
    if (success) {
      setContentArray(items);
      const { activeSectionId } = useStore.getState();
      if (activeSectionId === id) {
        useStore
          .getState()
          .setActiveSectionId({ id: activeSectionId, name: newName });
      }
    }
    return success;
  }
  return false;
};

const addNewSection = (
  atId?: string,
  type: SectionType = SectionType.maincontent
) => {
  const { setAddingSections } = useStore.getState();
  setAddingSections(true);
  let name = 'Untitled';
  const sectionContent = {
    name,
    id: uuidv4(),
    content: '',
    type,
    canHaveChildren: type === SectionType.folder,
    collapsed: false,
    children: [],
  } as Section;
  if (atId) {
    const { addNewSectionAt } = useStore.getState();
    addNewSectionAt(sectionContent, atId);
  } else {
    const { addNewSection } = useStore.getState();
    addNewSection(sectionContent);
  }
  setTimeout(() => {
    setAddingSections(false);
  }, 10);
};

const addNewFolder = (atId?: string) => {
  addNewSection(atId, SectionType.folder);
};

const addUuidToProject = (content: Sections): Sections => {
  const newSections = [] as Sections;

  for (let section of content) {
    // Swaps the old id to name prop, and adds unique uuid as id
    let newSection = {
      ...section,
      name: section.id,
      id: uuidv4(),
    } as Section;
    if (section.children.length) {
      newSection.children = addUuidToProject(section.children);
    }
    newSections.push(newSection);
  }

  return newSections;
};

export {
  saveProject,
  updateSectionName,
  addNewSection,
  addNewFolder,
  addUuidToProject,
};
