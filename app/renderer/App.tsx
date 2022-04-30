// import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { SidebarPane, PreviewPane, Writer, Modals } from './panes';
import theme from './theme/theme';
import GlobalStyles from './theme/globalStyles';
import { WinControls } from './controls';
import { useOpenProject } from './hooks';

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

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

const App = () => {
  useOpenProject();
  return (
    <ThemeProvider theme={theme}>
      {window.windowApi.os() === 'win32' && <WinControls />}
      <GlobalStyles />
      <AppContainer>
        <SidebarPane />
        <MainContent>
          <Writer />
        </MainContent>
        <PreviewPane />
        <Modals />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
