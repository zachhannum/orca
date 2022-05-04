import { useState } from 'react';
import styled, { css, useTheme } from 'styled-components';
import Color from 'color';
import useStore from '../store/useStore';
import { IconButton } from '../controls';
import { NewFileIcon, NewFolderIcon } from '../icons';
import { addNewSection } from '../utils/projectUtils';
import { SortableTree, SidebarProjectSectionItem } from '../components';

const StyledSidebarPSecondary = styled.p`
  color: ${(p) => p.theme.sidebarFgTextSecondary};
  font-size: 0.9em;
`;

const SectionHeader = styled.div`
  color: ${(p) => p.theme.sidebarFgTextSecondary};
  font-weight: 600;
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const ContentIcons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 7px;
`;

const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 20px;
  gap: 2px;
  overflow-y: auto;
  flex-basis: 0;
  flex-grow: 1;
  mask-image: linear-gradient(to top, transparent, black),
    linear-gradient(to left, transparent 8px, black 8px);
  mask-size: 100% 20000px;
  mask-position: left bottom;
  -webkit-mask-image: linear-gradient(to top, transparent, black),
    linear-gradient(to left, transparent 8px, black 8px);
  -webkit-mask-size: 100% 20000px;
  -webkit-mask-position: left bottom;
  transition: mask-position 0.3s, -webkit-mask-position 0.3s;
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    /* display: none; */
  }
  ::-webkit-scrollbar-thumb {
    background-color: inherit;
    background-color: ${(p) => Color(p.theme.sidebarBg).darken(0.1)};
  }
  &:hover {
    -webkit-mask-position: left top;
  }
  ${window.windowApi.os() === 'darwin' &&
  css`
    ::-webkit-scrollbar-thumb {
      border-radius: 4px;
    }
  `}
`;

const SidebarProjectSections = () => {
  const content = useStore((state) => state.content);
  const theme = useTheme();
  const [addingNewSections, setAddingNewSections] = useState(false);
  return (
    <>
      <SectionHeader>
        <span>Content</span>
        <ContentIcons>
          <IconButton
            iconSize="17px"
            onClick={() => {
              setAddingNewSections(true);
              addNewSection();
              setTimeout(() => {
                setAddingNewSections(false);
              }, 10);
            }}
            foregroundColor={theme.sidebarFgTextSecondary}
          >
            <NewFileIcon />
          </IconButton>
          <IconButton
            iconSize="17px"
            onClick={() => {}}
            foregroundColor={theme.sidebarFgTextSecondary}
          >
            <NewFolderIcon />
          </IconButton>
        </ContentIcons>
      </SectionHeader>
      {content.length === 0 ? (
        <>
          <StyledSidebarPSecondary>
            You don&rsquo;t have any content yet.
          </StyledSidebarPSecondary>
        </>
      ) : (
        <>
          <SectionsContainer>
            <SortableTree collapsible />
            {/* {content.map((content) => (
              <SidebarProjectSectionItem
                key={content.name}
                value={content.name}
                addingNew={addingNewSections}
              />
            ))} */}
          </SectionsContainer>
        </>
      )}
    </>
  );
};

export default SidebarProjectSections;
