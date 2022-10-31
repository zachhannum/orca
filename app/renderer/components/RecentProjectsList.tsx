import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { ProjectGlance } from 'types/types';
import { ScrollContainer } from 'renderer/components';

const StyledProjectGlance = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  transition: all 300ms ease-in-out;
`;

const StyledRecentProjectsTitle = styled.div`
  color: ${(p) => p.theme.sidebarFgText};
  padding-top: 15px;
`;

const StyledProjectGlanceBookTitle = styled.div`
  color: ${(p) => p.theme.sidebarFgText};
  font-size: 0.95em;
`;

const StyledProjectGlanceAuthor = styled.div`
  color: ${(p) => p.theme.sidebarFgTextSecondary};
  font-size: 0.9em;
`;

const StyledProjectGlancePath = styled.div`
  color: ${(p) => p.theme.sidebarFgTextSecondary};
  font-size: 0.8em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ScrollCss = css`
  margin: 0px -10px;
  overflow-y: scroll;
  flex-basis: 0;
  flex-grow: 1;
`;

const RecentProjectsList = () => {
  const [recentProjects, setRecentProjects] = useState<ProjectGlance[]>([]);

  useEffect(() => {
    window.appApi.getRecentProjects();
    window.appApi.onRecentProjects((projectGlances) => {
      setRecentProjects(projectGlances);
    });
  }, []);

  const handleProjectGlanceClick = (projectGlance: ProjectGlance) => {
    window.projectApi.openProjectPath(
      `${projectGlance.folderPath}/${projectGlance.fileName}`
    );
  };

  return (
    <>
      {recentProjects.length > 0 && (
        <>
          <StyledRecentProjectsTitle>Recent Projects</StyledRecentProjectsTitle>
          <ScrollContainer cssMixin={ScrollCss}>
            {recentProjects.slice(0, 3).map((projectGlance) => (
              <StyledProjectGlance
                key={projectGlance.folderPath.concat(projectGlance.fileName)}
                onClick={() => {
                  handleProjectGlanceClick(projectGlance);
                }}
              >
                <StyledProjectGlanceBookTitle>
                  {projectGlance.bookTitle}
                </StyledProjectGlanceBookTitle>
                <StyledProjectGlanceAuthor>
                  {projectGlance.authorName}
                </StyledProjectGlanceAuthor>
                <StyledProjectGlancePath>
                  {projectGlance.folderPath}
                </StyledProjectGlancePath>
              </StyledProjectGlance>
            ))}
          </ScrollContainer>
        </>
      )}
    </>
  );
};

export default RecentProjectsList;
