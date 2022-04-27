import Popup from 'reactjs-popup';
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
  const previewEnabled = useStore((state) => state.previewEnabled);
  const setPreviewEnabled = useStore((state) => state.setPreviewEnabled);
  return (
    <div>
      <Popup
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
          />
          <MoreOptionsSidebarItem
            hover
            iconElement={<OpenBookIcon />}
            rightElement={<span>⌘O</span>}
            label="Open Book"
          />
          <MoreOptionsSidebarItem
            iconElement={<PreviewIcon />}
            rightElement={
              <ToggleSwitch
                altColor
                onChange={setPreviewEnabled}
                defaultValue={previewEnabled}
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
