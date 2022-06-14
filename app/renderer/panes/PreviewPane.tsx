/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import styled, { useTheme, css } from 'styled-components';
import { PagedPreviewer, PagedRenderer, Pane } from '../components';
import { Button } from '../controls';
import useStore from '../store/useStore';
import { Test } from '../pagedjs/pagedTestContent';
import { IconButton } from '../controls';
import { PageRightIcon, PageLeftIcon } from '../icons';
import { parseBookContentToHtml } from '../utils/buildBook';
import { useOnBookPdfGenerated } from '../hooks';
import { baseStylesheet } from '../pagedjs/defaultPageCss';

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

const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
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
  const [isBuildingPdf, setIsBuildingPdf] = useState(false);
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

  const handleGeneratePdf = () => {
    setIsBuildingPdf(true);
    const html = parseBookContentToHtml();
    window.pagedApi.generateBookPdf({
      html,
      css: baseStylesheet({
        paragraphFontSize: 11,
      }).toString(),
    });
    // renderer process (mainWindow)
    const childWindow = window.open('', 'modal');
    if (childWindow) {
      const container = childWindow?.document.body;
      const root = createRoot(container);
      root.render(<PagedRenderer />);
    }

    setTimeout(() => {
      setIsBuildingPdf(false);
    }, 100000);
  };

  useOnBookPdfGenerated(() => {
    setIsBuildingPdf(false);
  });

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
          <StyledButtonsContainer>
            <Button loading={isBuildingPdf} onClick={handleGeneratePdf}>
              Generate PDF
            </Button>
          </StyledButtonsContainer>
        </>
      )}

      <Test />
    </Pane>
  );
};

export default PreviewPane;
