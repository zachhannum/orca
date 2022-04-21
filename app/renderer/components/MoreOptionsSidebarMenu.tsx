import Popup from 'reactjs-popup';
import styled, { useTheme } from 'styled-components';
import Color from 'color';
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

const StyledPopupDiv = styled.div`
  width: 220px;
  background-color: ${(p) => p.theme.contextMenuBg};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

type StyledMenuItemProps = {
  hoverColor: string;
};

const StyledMenuItem = styled.div<StyledMenuItemProps>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 7px 15px 7px 15px;
  &:first-of-type {
    padding-top: 15px;
  }
  &:last-of-type {
    padding-bottom: 15px;
  }
  color: ${(p) => p.theme.mainFgTextSecondary};
  &:hover {
    background-color: ${(p) => p.hoverColor};
  }

  transition: background-color 100ms ease-in-out;
`;

const StyledMenuItemIconDesc = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 13px;
`;

const StyledMenuDivider = styled.div`
  height: 2px;
  width: calc(100% - 30px);
  background-color: ${(p) => p.theme.contextMenuDivider};
  margin: 10px 15px;
`;

const MoreOptionsSidebarMenu = () => {
  const theme = useTheme();
  const menuItemHoverColor = Color(theme.contextMenuBg).darken(0.2);
  return (
    <div>
      <Popup
        trigger={
          // This is for sure hacky using the div since IconButton does not support ref. Should fix in the future
          <div>
            <IconButton
              size="25px"
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
          <StyledMenuItem hoverColor={menuItemHoverColor}>
            <StyledMenuItemIconDesc>
              <NewBookIcon color={theme.mainFgTextSecondary} size="15px" />
              <span>New Book</span>
            </StyledMenuItemIconDesc>
            <span>⌘N</span>
          </StyledMenuItem>
          <StyledMenuItem hoverColor={menuItemHoverColor}>
            <StyledMenuItemIconDesc>
              <OpenBookIcon color={theme.mainFgTextSecondary} size="15px" />
              <span>Open Book</span>
            </StyledMenuItemIconDesc>
            <span>⌘O</span>
          </StyledMenuItem>
          <StyledMenuItem hoverColor={theme.contextMenuBg}>
            <StyledMenuItemIconDesc>
              <PreviewIcon color={theme.mainFgTextSecondary} size="15px" />
              <span>Preview</span>
            </StyledMenuItemIconDesc>
            <ToggleSwitch
              altColor
              onChange={(val) => {
                console.log(val);
              }}
            />
          </StyledMenuItem>
          <StyledMenuDivider />
          <StyledMenuItem hoverColor={menuItemHoverColor}>
            <StyledMenuItemIconDesc>
              <UpdateIcon color={theme.mainFgTextSecondary} size="15px" />
              <span>Check For Updates</span>
            </StyledMenuItemIconDesc>
          </StyledMenuItem>
          <StyledMenuItem hoverColor={menuItemHoverColor}>
            <StyledMenuItemIconDesc>
              <HelpIcon color={theme.mainFgTextSecondary} size="15px" />
              <span>Help</span>
            </StyledMenuItemIconDesc>
          </StyledMenuItem>
          <StyledMenuItem hoverColor={menuItemHoverColor}>
            <StyledMenuItemIconDesc>
              <img width="15px" alt="icon" src={icon} />
              <span>About</span>
            </StyledMenuItemIconDesc>
          </StyledMenuItem>
          <StyledMenuItem hoverColor={menuItemHoverColor}>
            <StyledMenuItemIconDesc>
              <ExitIcon color={theme.contextMenuExit} size="15px" />
              <span>Exit</span>
            </StyledMenuItemIconDesc>
          </StyledMenuItem>
        </StyledPopupDiv>
      </Popup>
    </div>
  );
};

export default MoreOptionsSidebarMenu;
