import styled from 'styled-components';
import Color from 'color';
import { useBookWordCount } from 'renderer/hooks';
import { Button } from '../controls';
import useStore from '../store/useStore';
import SidebarProjectSections from './SidebarProjectSections';
import SaveIndicator from './SaveIndicator';
import RecentProjectsList from './RecentProjectsList';

const StyledSidebarProjectContent = styled.div`
  display: flex;
  user-select: none;
  flex-direction: column;
  padding: 5px;
  box-sizing: border-box;
  gap: 20px;
  flex-grow: 1;
`;

const StyledTitleBlock = styled.div`
  display: flex;
  padding: 10px 15px 0px 15px;
  box-sizing: border-box;
  flex-direction: column;
  gap: 5px;
`;

const StyledContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  gap: 5px;
  flex-grow: 1;
`;

const StyledNoProjectBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  box-sizing: border-box;
  flex-grow: 1;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledTitle = styled.span`
  color: ${(p) => p.theme.sidebarFgText};
  padding-right: 10px;
  font-weight: 500; //semi-bold
  font-size: 1.1em;
`;

const StyledAuthorName = styled.span`
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
  color: ${(p) => p.theme.sidebarFgTextSecondary};
  &:hover {
    color: ${(p) =>
      Color(p.theme.sidebarFgTextSecondary).darken(0.1).hsl().string()};
  }
`;

const StyledWordCount = styled.div`
  color: ${(p) => p.theme.sidebarFgTextSecondary};
  font-size: 0.85em;
  padding: 5px;
`;

const SidebarProjectContent = () => {
  const isProjectOpen = useStore((state) => state.isProjectOpen);
  const bookTitle = useStore((state) => state.bookTitle);
  const authorName = useStore((state) => state.authorName);
  const setNewBookModalOpen = useStore((state) => state.setNewBookModalOpen);
  const showBookWordCount = useStore(
    (state) => state.settings.writingStats.showWordCount
  );
  const bookWordCount = useBookWordCount();

  return (
    <StyledSidebarProjectContent>
      {isProjectOpen ? (
        <>
          <StyledTitleBlock>
            <StyledTitleContainer>
              <StyledTitle>{bookTitle}</StyledTitle>
              <SaveIndicator />
            </StyledTitleContainer>
            <StyledAuthorName>{authorName}</StyledAuthorName>
            {showBookWordCount && (
              <StyledWordCount>
                {bookWordCount.toLocaleString('en-US')} words
              </StyledWordCount>
            )}
          </StyledTitleBlock>
          <StyledContentBlock>
            <SidebarProjectSections />
          </StyledContentBlock>
        </>
      ) : (
        <>
          <StyledTitleBlock>
            <StyledTitle>No Project Open</StyledTitle>
          </StyledTitleBlock>
          <StyledNoProjectBlock>
            <StyledSidebarP>
              You haven&rsquo;t opened a project yet.
            </StyledSidebarP>
            <Button
              onClick={window.projectApi.openProject}
              color="rgba(200,200,200,0.2)"
            >
              Open a Project
            </Button>
            <StyledSidebarP>Or start a new project.</StyledSidebarP>
            <Button
              onClick={() => {
                setNewBookModalOpen(true);
              }}
              color="rgba(200,200,200,0.2)"
            >
              New Project
            </Button>
            <StyledSidebarP>
              To learn more about how to use Calamus, you can always check out
              our <StyledAnchor>help pages</StyledAnchor>.
            </StyledSidebarP>
            <RecentProjectsList />
          </StyledNoProjectBlock>
        </>
      )}
    </StyledSidebarProjectContent>
  );
};

export default SidebarProjectContent;
