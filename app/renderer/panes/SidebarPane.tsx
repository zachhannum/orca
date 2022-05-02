import styled, { useTheme, css } from 'styled-components';
import Color from 'color';
import {
  MoreOptionsSidebarMenu,
  Pane,
  SidebarProjectContent,
} from '../components';
import { IconButton } from '../controls';
import {
  SidebarOpenIcon,
  SidebarClosedIcon,
  HelpIcon,
  SettingsIcon,
} from '../icons';
import { useToggle } from '../hooks';
import useStore from '../store/useStore';

const SidebarTopContainer = styled.div`
  display: flex;
  padding-top: calc(
    env(titlebar-area-height, var(--fallback-title-bar-height)) + 20px
  );
  padding-left: 30px;
  padding-right: 30px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

const SidebarBottomContainer = styled.div`
  display: flex;
  padding: 30px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const SidebarBottomItem = styled.span`
  display: flex;
  align-items: center;
  align-content: center;
  font-size: 0.8em;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  color: ${(p) => p.theme.sidebarFgTextSecondary};
  path {
    fill: ${(p) => p.theme.sidebarFgTextSecondary};
  }
  &:hover {
    color: ${(p) => Color(p.theme.sidebarFgTextSecondary).lighten(0.2)};
    path {
      fill: ${(p) => Color(p.theme.sidebarFgTextSecondary).lighten(0.2)};
    }
  }
  gap: 12px;
`;

const paneStyleMixin = css`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  flex-basis: 1;
`;

type SidebarToggleButtonDivProps = {
  open: boolean;
};
const SidebarToggleButtonDiv = styled.div<SidebarToggleButtonDivProps>`
  display: flex;
  flex-direction: row;
  height: 100%;
  gap: 10px;
  margin-right: ${(props) => (props.open ? '0px' : '-100px')};
  transition: margin-right 300ms ease-in-out;
`;

const SidebarPane = () => {
  const theme = useTheme();
  const [open, toggleOpen] = useToggle(true);
  const bookTitle = useStore((state) => state.bookTitle);

  return (
    <Pane
      enabled={open}
      defaultWidth="300px"
      backgroundColor={theme.sidebarBg}
      styleMixin={paneStyleMixin}
    >
      <div>
        <SidebarTopContainer>
          <div /* placeholder */ />
          <SidebarToggleButtonDiv open={open}>
            <IconButton
              iconSize="20px"
              foregroundColor={theme.sidebarIconFg}
              backgroundColor={theme.sidebarIconBg}
              onClick={toggleOpen}
            >
              {open ? <SidebarOpenIcon /> : <SidebarClosedIcon />}
            </IconButton>
            <MoreOptionsSidebarMenu />
          </SidebarToggleButtonDiv>
        </SidebarTopContainer>
        <SidebarProjectContent />
      </div>
      <SidebarBottomContainer>
        <SidebarBottomItem>
          <HelpIcon size="15px" />
          <span>Feedback</span>
        </SidebarBottomItem>
        <SidebarBottomItem>
          <SettingsIcon size="15px" />
          <span>Settings</span>
        </SidebarBottomItem>
      </SidebarBottomContainer>
    </Pane>
  );
};

export default SidebarPane;
