/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect } from 'react';
import styled, { useTheme, css } from 'styled-components';
import { PagedPreviewer, Pane } from '../components';
import useStore from '../store/useStore';
import { Test } from '../pagedjs/pagedTestContent';
import { IconButton } from '../controls';
import { PageRightIcon, PageLeftIcon } from '../icons';

const paneStyleMixin = css`
  display: flex;
  user-select: none;
  right: 0;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 20px;
  flex-direction: column;
`;

const StyledPreviewerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70%;
  flex-direction: row;
  flex-wrap: none;
  gap: 20px;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const PreviewPane = () => {
  const previewEnabled = useStore((state) => state.previewEnabled);
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const [showPreviewer, setShowPreviewer] = useState(false);
  const next = () => {
    setPage(page + 1);
  };

  const prev = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    if (previewEnabled) {
      setPage(1);
      setShowPreviewer(true);
    } else if (!previewEnabled) {
      setTimeout(() => {
        setShowPreviewer(false);
      }, 300);
    }
  }, [previewEnabled]);

  return (
    <Pane
      enabled={previewEnabled}
      invert
      backgroundColor={theme.previewBg}
      defaultWidth="500px"
      minWidth={400}
      styleMixin={paneStyleMixin}
    >
      {showPreviewer && (
        <>
          <StyledPreviewerContainer>
            <IconButton
              iconSize="11px"
              foregroundColor={theme.previewArrow}
              scaleOnHover
              onClick={prev}
            >
              <PageLeftIcon />
            </IconButton>
            <PagedPreviewer pageNumber={page} onPageOverflow={setPage} />
            <IconButton
              iconSize="11px"
              foregroundColor={theme.previewArrow}
              scaleOnHover
              onClick={next}
            >
              <PageRightIcon />
            </IconButton>
          </StyledPreviewerContainer>
        </>
      )}

      <Test />
    </Pane>
  );
};

export default PreviewPane;
