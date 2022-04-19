import styled from 'styled-components';
import IconButton from '../controls/IconButton';
import { SidebarOpenIcon, SidebarClosedIcon } from '../icons';
import useToggle from '../utils/toggle';

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const SidebarContent = styled.div`
  display: flex;
  background-color: #323238;
  width: 310px;
  height: 100vh;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: space-between;
  margin-left: ${(props) => (props.open ? '0px' : '-310px')};
  transition: margin-left 300ms ease-in-out;
`;

const SidebarTopContainer = styled.div`
  display: flex;
  padding-top: env(titlebar-area-height, 500px);
  padding-left: 30px;
  padding-right: 30px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

const SidebarClosedDiv = styled.div`
  padding-top: env(titlebar-area-height, 500px);
  padding-left: 30px;
`;

const ProjectSidebar = () => {
  const [open, toggleOpen] = useToggle(true);

  return (
    <SidebarWrapper>
      <SidebarContent open={open}>
        <SidebarTopContainer>
          <div /* placeholder */ />
        </SidebarTopContainer>
      </SidebarContent>
      <SidebarClosedDiv open={open}>
        <IconButton
          size="25px"
          foregroundColor="#848488"
          backgroundColor="#46464F"
          onClick={toggleOpen}
        >
          {open ? <SidebarOpenIcon /> : <SidebarClosedIcon />}
        </IconButton>
      </SidebarClosedDiv>
    </SidebarWrapper>
  );
};

export default ProjectSidebar;
