import styled, { css } from 'styled-components';
import useStore from '../store/useStore';
import { Button } from '../controls';
import { addNewSection } from '../utils/projectUtils';
import SidebarProjectSectionItem from './SidebarProjectSectionItem';

const StyledSidebarPSecondary = styled.p`
  color: ${(p) => p.theme.sidebarFgTextSecondary};
  font-size: 0.9em;
  flex-grow: 1;
`;

const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 20px;
  gap: 5px;
  overflow-y: auto;
  flex-basis: 0;
  flex-grow: 1;

  ${window.windowApi.os() &&
  css`
    mask-image: linear-gradient(to top, transparent, black),
      linear-gradient(to left, transparent 17px, black 17px);
    mask-size: 100% 20000px;
    mask-position: left bottom;
    -webkit-mask-image: linear-gradient(to top, transparent, black),
      linear-gradient(to left, transparent 17px, black 17px);
    -webkit-mask-size: 100% 20000px;
    -webkit-mask-position: left bottom;
    transition: mask-position 0.3s, -webkit-mask-position 0.3s;
    ::-webkit-scrollbar {
      width: 12px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      /* display: none; */
    }
    ::-webkit-scrollbar-thumb {
      background-color: inherit;
      background-color: rgba(0, 0, 0, 0.1);
    }
    &:hover {
      -webkit-mask-position: left top;
    }
  `}
`;

const SidebarProjectSections = () => {
  const content = useStore((state) => state.content);
  return (
    <>
      {content.length === 0 ? (
        <>
          <StyledSidebarPSecondary>
            You don&rsquo;t have any content yet.
          </StyledSidebarPSecondary>
        </>
      ) : (
        <>
          <SectionsContainer>
            {content.map((content) => (
              <SidebarProjectSectionItem
                key={content.name}
                value={content.name}
              />
            ))}
          </SectionsContainer>
        </>
      )}
      <div />
      <Button label="Add a Section" onClick={addNewSection} />
    </>
  );
};

export default SidebarProjectSections;
