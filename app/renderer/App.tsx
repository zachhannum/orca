// import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { SidebarPane, PreviewPane, Writer } from './panes';
import theme from './theme/theme';

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  flex-shrink: 0;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
`;

const MainContent = styled.div`
  padding-top: env(titlebar-area-height, 500px);
  width: 50%;
  flex-grow: 2;
  flex-shrink: 2;
  height: calc(100% - env(titlebar-area-height, 500px));
  color: ${(p) => p.theme.mainFgText};
  background-color: ${(p) => p.theme.mainBg};
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
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
