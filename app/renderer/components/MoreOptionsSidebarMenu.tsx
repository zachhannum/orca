import { useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { MoreOptionsSidebarItem, ContextMenu } from '../components';
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
} from '../icons';
import icon from '../../../assets/icon.png';
import useStore from '../store/useStore';
import { saveProject } from '../utils/projectUtils';

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
  const isProjectOpen = useStore((state) => state.isProjectOpen);
  const previewEnabled = useStore((state) => state.previewEnabled);
  const setPreviewEnabled = useStore((state) => state.setPreviewEnabled);
  const setNewBookModalOpen = useStore((state) => state.setNewBookModalOpen);
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
      >
        <div style={{ width: '180px' }}>
          <MoreOptionsSidebarItem
            hover
            iconElement={<NewBookIcon />}
            rightElement={<span>⌘N</span>}
            label="New Book"
            onClick={() => {
              setShowMenu(false);
              setNewBookModalOpen(true);
            }}
          />
          <MoreOptionsSidebarItem
            hover
            iconElement={<OpenBookIcon />}
            rightElement={<span>⌘O</span>}
            label="Open Book"
            onClick={() => {
              setShowMenu(false);
              window.projectApi.openProject();
            }}
          />
          <MoreOptionsSidebarItem
            hover
            iconElement={<SaveIcon />}
            rightElement={<span>⌘S</span>}
            label="Save Book"
            onClick={() => {
              setShowMenu(false);
              saveProject();
            }}
          />
          <MoreOptionsSidebarItem
            iconElement={<PreviewIcon />}
            rightElement={
              <ToggleSwitch
                altColor
                onChange={setPreviewEnabled}
                defaultValue={previewEnabled}
                disabled={!isProjectOpen}
              />
            }
            label="Preview"
          />
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
            iconElement={<img width="10px" alt="icon" src={icon} />}
            label="About"
          />
          <MoreOptionsSidebarItem
            hover
            iconElement={<ExitIcon />}
            iconColorOverride={theme.contextMenuExit}
            label="Exit"
          />
        </div>
      </ContextMenu>
    </>
  );
};

export default MoreOptionsSidebarMenu;
