/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect } from 'react';
import { useTheme, css } from 'styled-components';
import { PagedRenderer, Pane } from '../components';
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
      styleMixin={paneStyleMixin}
    >
      {showPreviewer && (
        <IconButton
          iconSize="11px"
          foregroundColor={theme.previewArrow}
          scaleOnHover
          onClick={prev}
        >
          <PageLeftIcon />
        </IconButton>
      )}
      {showPreviewer && (
        <PagedRenderer pageNumber={page} onPageOverflow={setPage} />
      )}
      {showPreviewer && (
        <IconButton
          iconSize="11px"
          foregroundColor={theme.previewArrow}
          scaleOnHover
          onClick={next}
        >
          <PageRightIcon />
        </IconButton>
      )}

      <Test />
    </Pane>
  );
};

export default PreviewPane;
