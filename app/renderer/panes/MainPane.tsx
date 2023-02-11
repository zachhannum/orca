import styled from 'styled-components';
import Color from 'color';
import { AppModeControls } from 'renderer/controls';
import { Editor, Publish } from 'renderer/components';
import useStore from '../store/useStore';
import { useCommandKeyString } from '../hooks';
import type { AppMode } from '../store/slices/createAppStateSlice';

const MainContent = styled.div`
  height: calc(100% - var(--fallback-title-bar-height));
  width: 100%;
  color: ${(p) => p.theme.mainFgText};
  background-color: ${(p) => p.theme.previewBg};
  display: flex;
  align-items: stretch;
  flex-direction: column;
  position: relative;
  border-radius: 7px;
`;

const Frame = styled.div`
  --top-padding: calc(var(--fallback-title-bar-height));
  flex-grow: 1;
  flex-shrink: 1000;
  height: 100vh;
  padding: 7px;
  padding-top: 0px;
`;

const SectionTitle = styled.div`
  height: var(--top-padding);
  color: ${(p) => p.theme.sidebarFgTextSecondary};
  width: 100%;
  text-align: center;
  font-size: 0.9em;
  font-weight: 600;
  line-height: var(--top-padding);
  user-select: none;
  vertical-align: middle;
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
  color: ${(p) => Color(p.theme.mainBg).lighten(0.7).hsl().string()};
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

type AppContentProps = {
  appMode: AppMode;
};
const AppContent = ({ appMode }: AppContentProps) => {
  if (appMode === 'Write') {
    return <Editor />;
  }
  if (appMode === 'Publish') {
    return <Publish />;
  }
  return <div>Bad App Mode!</div>;
};

const MainPane = () => {
  const [
    isProjectOpen,
    appMode,
    activeSectionId,
    activeSectionName,
    bookTitle,
  ] = useStore((state) => [
    state.isProjectOpen,
    state.appMode,
    state.activeSectionId,
    state.activeSectionName,
    state.bookTitle,
  ]);

  const commandKeyString = useCommandKeyString();
  return (
    <Frame>
      <SectionTitle>
        {activeSectionName.length > 0
          ? `${bookTitle} - ${activeSectionName}`
          : 'Orca'}
      </SectionTitle>
      <MainContent>
        {isProjectOpen && (activeSectionId !== '' || appMode === 'Publish') ? (
          <>
            <AppModeControls />
            <AppContent appMode={appMode} />
          </>
        ) : (
          <NoProjectDiv>
            <NoProjectTitle>Orca</NoProjectTitle>
            <NoProjectSubtitle>
              <b>Write</b> and <b>Publish</b> novels with ease.
            </NoProjectSubtitle>
            <NoProjectHotkeys>
              <NoProjectHotkey>
                <span>Open a project</span>
                <span>{commandKeyString}O</span>
              </NoProjectHotkey>
              <NoProjectHotkey>
                <span>Start a new project</span>
                <span>{commandKeyString}N</span>
              </NoProjectHotkey>
            </NoProjectHotkeys>
          </NoProjectDiv>
        )}
      </MainContent>
    </Frame>
  );
};

export default MainPane;
