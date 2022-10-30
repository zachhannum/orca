import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProjectGlance } from 'types/types';
import ScrollContainer from './codemirror/ScrollContainer';

const StyledRecentProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

const StyledProjectGlance = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 0px -10px;
  border-radius: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  transition: all 100ms ease-in-out;
`;

const StyledRecentProjectsTitle = styled.div`
  color: ${(p) => p.theme.sidebarFgText};
`;

const StyledRecentProjectsAuthor = styled.div`
  color: ${(p) => p.theme.sidebarFgTextSecondary};
  font-size: 0.9em;
`;

const RecentProjectsList = () => {
  const [recentProjects, setRecentProjects] = useState<ProjectGlance[]>([]);

  useEffect(() => {
    window.appApi.getRecentProjects();
    window.appApi.onRecentProjects((projectGlances) => {
      setRecentProjects(projectGlances);
    });
  }, []);

  return (
    <StyledRecentProjectsList>
      {recentProjects.length > 0 && (
        <>
          <StyledRecentProjectsTitle>Recent Projects</StyledRecentProjectsTitle>
          <ScrollContainer>
            {recentProjects.map((projectGlance) => (
              <StyledProjectGlance
                key={projectGlance.folderPath.concat(projectGlance.fileName)}
              >
                <StyledRecentProjectsTitle>
                  {projectGlance.bookTitle}
                </StyledRecentProjectsTitle>
                <StyledRecentProjectsAuthor>
                  {projectGlance.authorName}
                </StyledRecentProjectsAuthor>
              </StyledProjectGlance>
            ))}
          </ScrollContainer>
        </>
      )}
    </StyledRecentProjectsList>
  );
};

export default RecentProjectsList;
