import { useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { MoreOptionsSidebarItem, ContextMenu } from '.';
import type { Position } from './ContextMenu';
import { IconButton, ToggleSwitch } from '../controls';
import {
  ExitIcon,
  HelpIcon,
  MoreVerticalIcon,
  NewBookIcon,
  OpenBookIcon,
  PreviewIcon,
  UpdateIcon,
  SaveIcon,
  InfoIcon,
  GenerateBookIcon,
} from '../icons';
import useStore from '../store/useStore';
import { saveProject } from '../project';
import { useCommandKeyString } from '../hooks';

const StyledMenuDivider = styled.div`
  height: 2px;
  width: calc(100% - 10px);
  background-color: ${(p) => p.theme.contextMenuDivider};
  margin: 10px 5px;
`;

const MoreOptionsSidebarMenu = () => {
  const theme = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const commandKeyString = useCommandKeyString();
  const [
    isProjectOpen,
    activeSectionId,
    previewEnabled,
    setPreviewEnabled,
    setNewBookModalOpen,
    setGenerateBookModalOpen,
    setSidebarMenuOpen,
  ] = useStore((state) => [
    state.isProjectOpen,
    state.activeSectionId,
    state.previewEnabled,
    state.setPreviewEnabled,
    state.setNewBookModalOpen,
    state.setGenerateBookModalOpen,
    state.setSidebarMenuOpen,
  ]);

  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const getMenuPosition = (): Position => {
    return {
      x: buttonRef.current
        ? buttonRef.current.getBoundingClientRect().right
        : 0,
      y: buttonRef.current
        ? buttonRef.current.getBoundingClientRect().bottom
        : 0,
    };
  };

  useEffect(() => {
    setSidebarMenuOpen(showMenu);
  }, [showMenu]);

  return (
    <>
      <IconButton
        ref={buttonRef}
        iconSize="20px"
        foregroundColor={theme.sidebarIconFg}
        backgroundColor="transparent"
        onClick={() => {
          setMenuPosition(getMenuPosition());
          setShowMenu(!showMenu);
        }}
      >
        <MoreVerticalIcon />
      </IconButton>
      <ContextMenu
        showMenu={showMenu}
        onCloseMenu={() => {
          setShowMenu(false);
        }}
        position={menuPosition}
        clickRef={buttonRef}
      >
        <div style={{ width: '180px' }}>
          <MoreOptionsSidebarItem
            hover
            iconElement={<NewBookIcon />}
            rightElement={<span>{commandKeyString}N</span>}
            label="New Book"
            onClick={() => {
              setShowMenu(false);
              setNewBookModalOpen(true);
            }}
          />
          <MoreOptionsSidebarItem
            hover
            iconElement={<OpenBookIcon />}
            rightElement={<span>{commandKeyString}O</span>}
            label="Open Book"
            onClick={() => {
              setShowMenu(false);
              window.projectApi.openProject();
            }}
          />
          {isProjectOpen && (
            <>
              <MoreOptionsSidebarItem
                hover
                iconElement={<SaveIcon />}
                rightElement={<span>{commandKeyString}S</span>}
                label="Save Book"
                onClick={() => {
                  if (isProjectOpen) {
                    setShowMenu(false);
                    saveProject();
                  }
                }}
              />
              <MoreOptionsSidebarItem
                hover
                iconElement={<GenerateBookIcon />}
                rightElement={<span>{commandKeyString}G</span>}
                label="Generate Book"
                onClick={() => {
                  setShowMenu(false);
                  setGenerateBookModalOpen(true);
                }}
              />
              <MoreOptionsSidebarItem
                iconElement={<PreviewIcon />}
                rightElement={
                  <ToggleSwitch
                    type="alt"
                    onChange={setPreviewEnabled}
                    disabled={activeSectionId === ''}
                    value={previewEnabled}
                    size="small"
                  />
                }
                label="Preview"
              />
            </>
          )}

          <StyledMenuDivider />
          <MoreOptionsSidebarItem
            hover
            iconElement={<UpdateIcon />}
            label="Check For Updates"
          />
          <MoreOptionsSidebarItem
            hover
            iconElement={<HelpIcon />}
            label="Help"
          />
          <MoreOptionsSidebarItem
            hover
            iconElement={<InfoIcon />}
            label="About"
          />
          <MoreOptionsSidebarItem
            hover
            iconElement={<ExitIcon />}
            iconColorOverride={theme.contextMenuExit}
            label="Exit"
            onClick={() => {
              window.windowApi.closeWindow();
            }}
          />
        </div>
      </ContextMenu>
    </>
  );
};

export default MoreOptionsSidebarMenu;
