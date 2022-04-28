/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { PagedRenderer } from '../components';
import useStore from '../store/useStore';
import { Test } from '../pagedjs/pagedTestContent';
import { IconButton } from '../controls';
import { PageRightIcon, PageLeftIcon } from '../icons';

type StyledPaneProps = {
  previewEnabled: boolean;
};

const StyledPane = styled.div<StyledPaneProps>`
  height: 100%;
  width: 500px;
  margin-right: ${(p) => (p.previewEnabled ? '0px' : '-500px')};
  background-color: ${(p) => p.theme.previewBg};
  transition: margin-right 300ms ease-in-out;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const PreviewDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const PreviewPane = () => {
  const previewEnabled = useStore((state) => state.previewEnabled);
  const [page, setPage] = useState(1);
  const theme = useTheme();

  const next = () => {
    setPage(page + 1);
  };

  const prev = () => {
    setPage(page - 1);
  };

  return (
    <StyledPane previewEnabled={previewEnabled}>
      {previewEnabled && (
        <PreviewDiv>
          <IconButton
            iconSize="11px"
            foregroundColor={theme.previewArrow}
            scaleOnHover
            onClick={prev}
          >
            <PageLeftIcon />
          </IconButton>
          <PagedRenderer pageNumber={page} onPageOverflow={setPage} />
          <IconButton
            iconSize="11px"
            foregroundColor={theme.previewArrow}
            scaleOnHover
            onClick={next}
          >
            <PageRightIcon />
          </IconButton>
        </PreviewDiv>
      )}
      <Test />
    </StyledPane>
  );
};

export default PreviewPane;
