import { useRef } from 'react';
import Popup from 'reactjs-popup';
import { PopupActions } from 'reactjs-popup/dist/types';
import styled, { useTheme } from 'styled-components';
import MoreOptionsSidebarItem from './MoreOptionsSidebarItem';
import { IconButton, ToggleSwitch } from '../controls';
import {
  ExitIcon,
  HelpIcon,
  MoreVerticalIcon,
  NewBookIcon,
  OpenBookIcon,
  PreviewIcon,
  UpdateIcon,
} from '../icons';
import icon from '../../../assets/icon.png';
import useStore from '../store/useStore';
import SaveIcon from '../icons/SaveIcon';

const StyledPopupDiv = styled.div`
  width: 180px;
  background-color: ${(p) => p.theme.contextMenuBg};
  backdrop-filter: blur(40px);
  border-radius: 10px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const StyledMenuDivider = styled.div`
  height: 2px;
  width: calc(100% - 10px);
  background-color: ${(p) => p.theme.contextMenuDivider};
  margin: 10px 5px;
`;

const MoreOptionsSidebarMenu = () => {
  const theme = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menuRef = useRef<PopupActions | null>(null);
  const isProjectOpen = useStore((state) => state.isProjectOpen);
  const previewEnabled = useStore((state) => state.previewEnabled);
  const setPreviewEnabled = useStore((state) => state.setPreviewEnabled);
  const setNewBookModalOpen = useStore((state) => state.setNewBookModalOpen);
  return (
    <div>
      <Popup
        ref={menuRef}
        trigger={
          // This is for sure hacky using the div since IconButton does not support ref. Should fix in the future
          <div>
            <IconButton
              iconSize="20px"
              foregroundColor={theme.sidebarIconFg}
              backgroundColor="transparent"
              onClick={() => {}} // Do nothing since Popup is using the <div> click. We just need IconButton for the visuals.
            >
              <MoreVerticalIcon />
            </IconButton>
          </div>
        }
        position={['bottom left']}
        closeOnDocumentClick
        arrow={false}
        offsetX={10}
        offsetY={10}
      >
        <StyledPopupDiv>
          <MoreOptionsSidebarItem
            hover
            iconElement={<NewBookIcon />}
            rightElement={<span>⌘N</span>}
            label="New Book"
            onClick={() => {
              menuRef.current?.close();
              setNewBookModalOpen(true);
            }}
          />
          <MoreOptionsSidebarItem
            hover
            iconElement={<OpenBookIcon />}
            rightElement={<span>⌘O</span>}
            label="Open Book"
            onClick={() => {
              menuRef.current?.close();
              window.projectApi.openProject();
            }}
          />
          <MoreOptionsSidebarItem
            hover
            iconElement={<SaveIcon />}
            rightElement={<span>⌘S</span>}
            label="Save Book"
            onClick={() => {
              menuRef.current?.close();
              const projectContents = {
                bookTitle: useStore.getState().bookTitle,
                bookSubTitle: useStore.getState().bookSubTitle,
                authorName: useStore.getState().authorName,
                seriesName: useStore.getState().seriesName,
                ISBN: useStore.getState().ISBN,
                language: useStore.getState().language,
                publisher: useStore.getState().publisher,
                frontMatter: useStore.getState().frontMatter,
                mainContent: useStore.getState().mainContent,
                backMatter: useStore.getState().backMatter,
              };
              const savePath = useStore.getState().projectPath;
              window.projectApi.saveProject({
                projectContent: projectContents,
                filePath: savePath,
              });
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
        </StyledPopupDiv>
      </Popup>
    </div>
  );
};

export default MoreOptionsSidebarMenu;
