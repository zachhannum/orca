import styled from 'styled-components';
import { IconButton } from '../controls';
import { SidebarOpenIcon, SidebarClosedIcon, MoreVerticalIcon } from '../icons';
import useToggle from '../utils/toggle';

const StyledSidebar = styled.div`
  display: flex;
  background-color: #323238;
  width: 270px;
  min-width: 270px;
  height: 100vh;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: space-between;
  margin-left: ${(props) => (props.open ? '0px' : '-270px')};
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

const SidebarToggleButtonDiv = styled.div`
  margin-right: ${(props) => (props.open ? '0px' : '-150px')};
  transition: margin-right 200ms ease-in-out;
  z-index: 100;
`;

const ProjectSidebar = () => {
  const [open, toggleOpen] = useToggle(true);

  return (
    <StyledSidebar open={open}>
      <SidebarTopContainer>
        <div /* placeholder */ />
        <SidebarTopButtonsDiv>
          <SidebarToggleButtonDiv open={open}>
            <IconButton
              size="25px"
              foregroundColor="#848488"
              backgroundColor="#46464F"
              onClick={toggleOpen}
            >
              {open ? <SidebarOpenIcon /> : <SidebarClosedIcon />}
            </IconButton>
          </SidebarToggleButtonDiv>
          <IconButton
            size="25px"
            foregroundColor="#848488"
            backgroundColor="transparent"
          >
            <MoreVerticalIcon />
          </IconButton>
        </SidebarTopButtonsDiv>
      </SidebarTopContainer>
    </StyledSidebar>
  );
};

export default ProjectSidebar;
