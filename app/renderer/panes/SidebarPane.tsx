import styled, { useTheme, css } from 'styled-components';
import { MoreOptionsSidebarMenu, Pane } from '../components';
import { IconButton } from '../controls';
import { SidebarOpenIcon, SidebarClosedIcon } from '../icons';
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
      <div>{bookTitle}</div>
    </Pane>
  );
};

export default SidebarPane;
