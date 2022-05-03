import styled from 'styled-components';
import useStore from '../store/useStore';
import { Button } from '../controls';
import { addNewSection } from '../utils/projectUtils';
import SidebarProjectSectionItem from './SidebarProjectSectionItem';

const StyledSidebarPSecondary = styled.p`
  color: ${(p) => p.theme.sidebarFgTextSecondary};
  font-size: 0.9em;
`;

const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 20px;
  gap: 5px;
`;

const SidebarProjectSections = () => {
  const content = useStore((state) => state.content);
  return (
    <>
      {content.length === 0 ? (
        <>
          <StyledSidebarPSecondary>
            You don&rsquo;t have any content yet.
          </StyledSidebarPSecondary>
          <Button label="Add a Section" onClick={addNewSection} />
        </>
      ) : (
        <>
          <SectionsContainer>
            {content.map((content) => (
              <SidebarProjectSectionItem
                key={content.name}
                value={content.name}
              />
            ))}
          </SectionsContainer>
          <Button label="Add a Section" onClick={addNewSection} />
        </>
      )}
    </>
  );
};

export default SidebarProjectSections;
