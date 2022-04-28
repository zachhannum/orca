// import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { SidebarPane, PreviewPane, Writer } from './panes';
import theme from './theme/theme';
import { WinControls } from './controls';

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
  return (
    <ThemeProvider theme={theme}>
      {window.calamusApi.os() === 'win32' && <WinControls />}
      <AppContainer>
        <SidebarPane />
        <MainContent>
          <Writer />
        </MainContent>
        <PreviewPane />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
