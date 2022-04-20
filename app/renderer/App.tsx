// import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import Writer from './components/Writer';
import ProjectSidebar from './components/ProjectSidebar';
import theme from './theme/theme';

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  flex-shrink: 0;
  height: 100vh;
  width: 100vw;
`;

const MainContent = styled.div`
  padding-top: env(titlebar-area-height, 500px);
  width: 100%;
  height: calc(100% - env(titlebar-area-height, 500px));
  color: ${(p) => p.theme.mainFgText};
  background-color: ${(p) => p.theme.mainBg};
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <ProjectSidebar />
        <MainContent>
          <Writer />
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
