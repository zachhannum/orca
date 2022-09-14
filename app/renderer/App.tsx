// import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { SidebarPane, PreviewPane, MainPane, Modals } from './panes';
import theme from './theme/theme';
import GlobalStyles from './theme/globalStyles';
import { WinControls } from './controls';
import { useOpenProject, useProjectHotkeys } from './hooks';

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const App = () => {
  useOpenProject();
  useProjectHotkeys();
  return (
    <ThemeProvider theme={theme}>
      {window.windowApi.os() === 'win32' && <WinControls />}
      <GlobalStyles />
      <AppContainer>
        <SidebarPane />
        <MainPane />
        <PreviewPane />
        <Modals />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
