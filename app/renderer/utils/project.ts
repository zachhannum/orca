import { SectionType } from 'types/types';
import useStore from '../store/useStore';

const addNewSection = () => {
  const defaultNameBase = 'Untitled';
  const { mainContent } = useStore.getState();
  let i = 1;
  let name = defaultNameBase;
  // eslint-disable-next-line @typescript-eslint/no-loop-func
  while (mainContent.find((p) => p.name === name) !== undefined) {
    name = `${defaultNameBase}${i}`;
    i += 1;
  }

  const content = '';
  const { updateOpenSection } = useStore.getState();
  const { addMainContent } = useStore.getState();
  updateOpenSection(name, {
    name,
    content,
    type: SectionType.maincontent,
  });
  addMainContent({
    name,
  });

  console.log(useStore.getState().openSections);
  console.log(useStore.getState().mainContent);
};

const updateSectionName = (oldName: string, newName: string) => {
  const { changeMainContent } = useStore.getState();
  changeMainContent(oldName, { name: newName });
  // @TODO update name in open sections
};

export { addNewSection, updateSectionName };
