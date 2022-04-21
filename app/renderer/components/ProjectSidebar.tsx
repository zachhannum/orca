import { useContext } from 'react';
import styled, { useTheme } from 'styled-components';
import MoreOptionsSidebarMenu from './MoreOptionsSidebarMenu';
import { IconButton } from '../controls';
import { SidebarOpenIcon, SidebarClosedIcon, MoreVerticalIcon } from '../icons';
import useToggle from '../utils/toggle';

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
  padding-top: calc(env(titlebar-area-height, 500px) + 20px);
  padding-left: 30px;
  padding-right: 30px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

const SidebarTopButtonsDiv = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  flex-direction: row;
  height: 100%;
  gap: 10px;
`;

type SidebarToggleButtonDivProps = {
  open: boolean;
};
const SidebarToggleButtonDiv = styled.div<SidebarToggleButtonDivProps>`
  margin-right: ${(props) => (props.open ? '0px' : '-150px')};
  transition: margin-right 200ms ease-in-out;
  z-index: 100;
`;

const ProjectSidebar = () => {
  const theme = useTheme();
  const [open, toggleOpen] = useToggle(true);

  return (
    <StyledSidebar open={open} width="300px">
      <SidebarTopContainer>
        <div /* placeholder */ />
        <SidebarTopButtonsDiv>
          <SidebarToggleButtonDiv open={open}>
            <IconButton
              size="25px"
              foregroundColor={theme.sidebarIconFg}
              backgroundColor={theme.sidebarIconBg}
              onClick={toggleOpen}
            >
              {open ? <SidebarOpenIcon /> : <SidebarClosedIcon />}
            </IconButton>
          </SidebarToggleButtonDiv>
          <MoreOptionsSidebarMenu />
        </SidebarTopButtonsDiv>
      </SidebarTopContainer>
    </StyledSidebar>
  );
};

export default ProjectSidebar;
