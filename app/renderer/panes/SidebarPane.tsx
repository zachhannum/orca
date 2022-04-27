import styled, { useTheme } from 'styled-components';
import { MoreOptionsSidebarMenu } from '../components';
import { IconButton } from '../controls';
import { SidebarOpenIcon, SidebarClosedIcon } from '../icons';
import { useToggle } from '../hooks';

type StyledSidebarProps = {
  open: boolean;
  width: string;
};

const StyledSidebar = styled.div<StyledSidebarProps>`
  display: flex;
  background-color: ${(p) => p.theme.sidebarBg};
  width: 270px;
  min-width: 270px;
  height: 100vh;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: space-between;
  margin-left: ${(p) => (p.open ? '0px' : '-270px')};
  transition: margin-left 200ms ease-in-out;
`;

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

type SidebarToggleButtonDivProps = {
  open: boolean;
};
const SidebarToggleButtonDiv = styled.div<SidebarToggleButtonDivProps>`
  display: flex;
  flex-direction: row;
  height: 100%;
  gap: 10px;
  margin-right: ${(props) => (props.open ? '0px' : '-100px')};
  transition: margin-right 200ms ease-in-out;
  z-index: 100;
`;

const SidebarPane = () => {
  const theme = useTheme();
  const [open, toggleOpen] = useToggle(true);

  return (
    <StyledSidebar open={open} width="300px">
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
    </StyledSidebar>
  );
};

export default SidebarPane;
