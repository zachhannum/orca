import styled from 'styled-components';
import { Writer } from '../components';
import useStore from '../store/useStore';

const MainContent = styled.div`
  --top-padding: calc(
    env(titlebar-area-height, var(--fallback-title-bar-height)) + 20px
  );
  padding-top: var(--top-padding);
  flex-grow: 1;
  flex-shrink: 1000;
  height: calc(100% - var(--top-padding));
  color: ${(p) => p.theme.mainFgText};
  background-color: ${(p) => p.theme.mainBg};
`;

const NoProjectDiv = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  user-select: none;
  color: ${(p) => p.theme.sidebarFgTextSecondary};
`;

const NoProjectTitle = styled.span`
  font-weight: 600;
  font-size: 2em;
`;

const NoProjectSubtitle = styled.span`
  font-weight: normal;
  font-size: 1.2em;
`;

const NoProjectHotkeys = styled.div`
  padding-top: 20px;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.9em;
  font-weight: 600;
`;

const NoProjectHotkey = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const MainPane = () => {
  const isProjectOpen = useStore((state) => state.isProjectOpen);
  return (
    <MainContent>
      {isProjectOpen ? (
        <Writer />
      ) : (
        <NoProjectDiv>
          <NoProjectTitle>Calamus</NoProjectTitle>
          <NoProjectSubtitle>
            <b>Write</b> and <b>Publish</b> novels with ease.
          </NoProjectSubtitle>
          <NoProjectHotkeys>
            <NoProjectHotkey>
              <span>Open a project</span>
              <span>⌘O</span>
            </NoProjectHotkey>
            <NoProjectHotkey>
              <span>Start a new project</span>
              <span>⌘N</span>
            </NoProjectHotkey>
          </NoProjectHotkeys>
        </NoProjectDiv>
      )}
    </MainContent>
  );
};

export default MainPane;
