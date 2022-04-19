import styled from 'styled-components';
import SidebarOpenIcon from '../icons/SidebarOpenIcon';
import IconButton from '../controls/IconButton';

const SidebarWrapper = styled.div`
  display: flex;
  background-color: #323238;
  width: 350px;
  height: 100vh;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: space-between;
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

const ProjectSidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarTopContainer>
        <div /* placeholder */ />
        <IconButton
          size="25px"
          foregroundColor="#848488"
          backgroundColor="#46464F"
        >
          <SidebarOpenIcon />
        </IconButton>
      </SidebarTopContainer>
    </SidebarWrapper>
  );
};

export default ProjectSidebar;
