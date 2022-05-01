import styled from 'styled-components';
import { Button } from '../controls';
import useStore from '../store/useStore';

const StyledSidebarProjectContent = styled.div`
  display: flex;
  user-select: none;
  flex-direction: column;
  padding: 30px;
  box-sizing: border-box;
  gap: 20px;
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
`;

const StyledBookTitle = styled.div`
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
  color: ${(p) => p.theme.sidebarFgTextSecondary};
  font-size: 0.9em;
`;

const SidebarProjectContent = () => {
  const isProjectOpen = useStore((state) => state.isProjectOpen);
  const bookTitle = useStore((state) => state.bookTitle);
  const authorName = useStore((state) => state.authorName);
  return (
    <StyledSidebarProjectContent>
      {isProjectOpen && (
        <>
          <StyledTitleBlock>
            <StyledBookTitle>{bookTitle}</StyledBookTitle>
            <StyledAuthorName>{authorName}</StyledAuthorName>
          </StyledTitleBlock>
          <StyledContentBlock>
            <StyledSidebarP>
              You don&rsquo;t have any content yet.
            </StyledSidebarP>
            <Button label="Add a Section" onClick={() => {}} />
          </StyledContentBlock>
        </>
      )}
    </StyledSidebarProjectContent>
  );
};

export default SidebarProjectContent;
