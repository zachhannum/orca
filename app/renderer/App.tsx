// import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';
import Writer from './components/Writer';
import ProjectSidebar from './components/ProjectSidebar';

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
`;

const App = () => {
  return (
    <AppContainer>
      <ProjectSidebar />
      <MainContent>
        <Writer />
      </MainContent>
    </AppContainer>
  );
};

export default App;
