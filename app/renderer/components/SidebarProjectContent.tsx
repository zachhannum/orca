import styled from 'styled-components';
import Color from 'color';
import { Button } from '../controls';
import useStore from '../store/useStore';
import SidebarProjectSections from './SidebarProjectSections';

const StyledSidebarProjectContent = styled.div`
  display: flex;
  user-select: none;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  gap: 20px;
  flex-grow: 1;
`;

const StyledTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex-grow: 1;
`;

const StyledTitle = styled.div`
  color: ${(p) => p.theme.sidebarFgText};
  font-weight: 500; //semi-bold
  font-size: 1.1em;
`;

const StyledAuthorName = styled.div`
  color: ${(p) => p.theme.sidebarFgTextSecondary};
  font-weight: 500;
  font-size: 1em;
`;

const StyledSidebarP = styled.p`
  color: ${(p) => p.theme.sidebarFgText};
  font-size: 0.9em;
`;

const StyledAnchor = styled.a`
  cursor: pointer;
  color: ${(p) => p.theme.buttonPrimaryBg};
  &:hover {
    color: ${(p) => Color(p.theme.buttonPrimaryBg).darken(0.1).hsl().string()};
  }
`;

const SidebarProjectContent = () => {
  const isProjectOpen = useStore((state) => state.isProjectOpen);
  const bookTitle = useStore((state) => state.bookTitle);
  const authorName = useStore((state) => state.authorName);
  const setNewBookModalOpen = useStore((state) => state.setNewBookModalOpen);
  return (
    <StyledSidebarProjectContent>
      {isProjectOpen ? (
        <>
          <StyledTitleBlock>
            <StyledTitle>{bookTitle}</StyledTitle>
            <StyledAuthorName>{authorName}</StyledAuthorName>
          </StyledTitleBlock>
          <StyledContentBlock>
            <SidebarProjectSections />
          </StyledContentBlock>
        </>
      ) : (
        <>
          <StyledTitle>No Project Open</StyledTitle>
          <StyledContentBlock>
            <StyledSidebarP>
              You haven&rsquo;t opened a project yet.
            </StyledSidebarP>
            <Button
              label="Open Project"
              onClick={window.projectApi.openProject}
            />
            <StyledSidebarP>Or start a new project.</StyledSidebarP>
            <Button
              label="New Project"
              onClick={() => {
                setNewBookModalOpen(true);
              }}
            />
            <StyledSidebarP>
              To learn more about how to use Calamus, you can always check out
              our <StyledAnchor>help pages</StyledAnchor>.
            </StyledSidebarP>
          </StyledContentBlock>
        </>
      )}
    </StyledSidebarProjectContent>
  );
};

export default SidebarProjectContent;
