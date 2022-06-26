import { useRef, useState, useEffect, RefObject } from 'react';
import styled, { css, useTheme } from 'styled-components';
import Color from 'color';
import useStore from '../store/useStore';
import { IconButton } from '../controls';
import { NewFileIcon, NewFolderIcon } from '../icons';
import { addNewSection, addNewFolder } from '../utils/projectUtils';
import {
  SectionContextMenu,
  SortableTree,
  ContextMenu,
  TooltipText,
} from '../components';
import { useIsHovering } from '../hooks';
import { getContextMenuPosition } from '../utils/menuUtils';

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
  padding-right: 15px;
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
  overflow-y: scroll;
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
    background-color: ${(p) =>
      Color(p.theme.sidebarBg).alpha(1).darken(0.2).hsl().string()};
    cursor: pointer;
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
  const setContentArray = useStore((state) => state.setContentArray);
  const theme = useTheme();
  const newFileButtonRef = useRef<HTMLAnchorElement | null>(null);
  const newFolderButtonRef = useRef<HTMLAnchorElement | null>(null);
  const isHoveringOnNewFileButton = useIsHovering(newFileButtonRef);
  const isHoveringOnNewFolderButton = useIsHovering(newFolderButtonRef);
  const [tooltipText, setTooltipText] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const calculateAndSetTooltipPosition = (
    ref: RefObject<HTMLAnchorElement | null>
  ) => {
    if (ref.current) {
      const { x, y } = getContextMenuPosition(ref.current, 'center', 'bottom');
      setTooltipPosition({ x, y: y + 5 });
    }
  };

  useEffect(() => {
    if (isHoveringOnNewFileButton) {
      setTooltipText('New Section');
      calculateAndSetTooltipPosition(newFileButtonRef);
    } else if (isHoveringOnNewFolderButton) {
      setTooltipText('New Folder');
      calculateAndSetTooltipPosition(newFolderButtonRef);
    }
    setShowTooltip(isHoveringOnNewFileButton || isHoveringOnNewFolderButton);
  }, [isHoveringOnNewFileButton, isHoveringOnNewFolderButton]);

  return (
    <>
      <SectionHeader>
        <span>Content</span>
        <ContentIcons>
          <IconButton
            ref={newFileButtonRef}
            iconSize="17px"
            onClick={() => {
              addNewSection();
            }}
            foregroundColor={theme.sidebarFgTextSecondary}
          >
            <NewFileIcon />
          </IconButton>
          <IconButton
            ref={newFolderButtonRef}
            iconSize="17px"
            onClick={() => {
              addNewFolder();
            }}
            foregroundColor={theme.sidebarFgTextSecondary}
          >
            <NewFolderIcon />
          </IconButton>
          <ContextMenu
            showMenu={showTooltip}
            position={tooltipPosition}
            onCloseMenu={() => {
              setShowTooltip(false);
            }}
            center
          >
            <TooltipText>{tooltipText}</TooltipText>
          </ContextMenu>
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
            <SortableTree items={content} onItemsSorted={setContentArray} />
          </SectionsContainer>
          <SectionContextMenu />
        </>
      )}
    </>
  );
};

export default SidebarProjectSections;
