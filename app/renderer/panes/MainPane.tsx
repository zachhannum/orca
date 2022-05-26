import styled from 'styled-components';
import Color from 'color';
import { BasicWriter } from '../components/writer';
import useStore from '../store/useStore';

const MainContent = styled.div`
  --top-padding: calc(
    env(titlebar-area-height, var(--fallback-title-bar-height)) + 10px
  );
  margin-top: calc(var(--top-padding));
  flex-grow: 1;
  flex-shrink: 1000;
  height: calc(100% - var(--top-padding));
  color: ${(p) => p.theme.mainFgText};
  background-color: ${(p) => p.theme.mainBg};
`;

const SectionTitle = styled.div`
  height: var(--top-padding);
  color: ${(p) => p.theme.mainFgTextSecondary};
  margin-top: calc(-1 * var(--top-padding));
  width: 100%;
  text-align: center;
  font-size: 0.9em;
  font-weight: 600;
  line-height: var(--top-padding);
  user-select: none;
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
  color: ${(p) => Color(p.theme.mainBg).lighten(0.7)};
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
  const activeSectionId = useStore((state) => state.activeSectionId);
  return (
    <MainContent>
      {isProjectOpen && activeSectionId !== '' ? (
        <>
          <SectionTitle>{activeSectionId}</SectionTitle>
          <BasicWriter />
        </>
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
