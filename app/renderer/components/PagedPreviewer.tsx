import { useRef, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { Polisher, Chunker, initializeHandlers } from 'pagedjs';
import { debounce } from 'lodash';
import useStore from 'renderer/store/useStore';
import { parseChapterContentToHtml } from 'renderer/utils/buildBook';
import { usePagedCss } from '../pagedjs/usePagedCss';
import { useResizeObserver } from '../hooks';

const StyledRenderer = styled.div`
  height: 100%;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PageContainer = styled.div`
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.7) 0px 20px 35px;
  background-color: ${(p) => p.theme.paperBg};
  border-radius: 5px;
  .pagedjs_pages {
    display: flex;
    flex-direction: row;
  }
  .pagedjs_page {
    background-color: ${(p) => p.theme.paperBg};
  }
  height: var(--pagedjs-height);
  width: var(--pagedjs-width);
`;

const PagedStagingContainer = styled.div`
  visibility: hidden;
  position: absolute;
  top: -100000px;
`;

type ScalerProps = {
  scale: number;
};
const Scaler = styled.div<ScalerProps>`
  transform: scale(${(p) => p.scale});
  position: relative;
`;

type PagedPreviewerProps = {
  pageNumber: number;
  onPageOverflow: (pageNumber: number) => void;
};

const PagedPreviewer = ({
  pageNumber,
  onPageOverflow,
}: PagedPreviewerProps) => {
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const pagedStageRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<HTMLDivElement>(null);
  const previewContent = useStore((state) => state.previewContent);
  const polisher = useRef<typeof Polisher>(null);
  const chunker = useRef<typeof Chunker>(null);
  const [scale, setScale] = useState(0.5);
  const [prevPage, setPrevPage] = useState(1);
  const [page, setPage] = useState(1);
  const [overflow, setOverflow] = useState(false);
  const buildingPreview = useRef(false);
  const styleSheet = usePagedCss();
  const customCss = useStore((state) => state.customCss);

  const setPageCounterIncrement = (pageIncrement: number) => {
    document.documentElement.style.setProperty(
      '--pagedjs-page-counter-increment',
      `${pageIncrement}`
    );
  };

  /* Navigate to new Page */
  useEffect(() => {
    const pageContainer = pageContainerRef.current;
    console.log(`navigating to page ${page}`);
    if (pageContainer) {
      const navigatePage = pageContainer.querySelector<HTMLElement>(
        `[data-page-number="${page}"]`
      );
      if (navigatePage) {
        console.log(`page ${page} found.`);
        navigatePage.style.display = '';
        navigatePage.scrollIntoView();
        if (prevPage !== page) {
          console.log(
            `previous page ${prevPage} is different than current page, hiding previous page.`
          );
          const prevPageElement = pageContainer.querySelector<HTMLElement>(
            `[data-page-number="${prevPage}"]`
          );
          if (prevPageElement && !overflow) {
            prevPageElement.style.display = 'none';
          }
        }
        if (!overflow) {
          setPageCounterIncrement(page);
        } else if (overflow) {
          setOverflow(false);
        }
        setPrevPage(page);
      } else if (page !== 1) {
        console.log(`Overflow detected, resetting to ${prevPage}`);
        /* There should be always at least one page, so no overflow on page 1 */
        setOverflow(true);
        onPageOverflow(prevPage);
      }
    }
  }, [page]);

  const handleResize = (height: number, width: number) => {
    if (pageContainerRef.current) {
      const newScale = Math.min(
        height / pageContainerRef.current.offsetHeight,
        width / pageContainerRef.current.offsetWidth
      );
      if (newScale !== Infinity) {
        setScale(newScale);
      }
    }
  };

  useEffect(() => {
    console.log(`Controls attempting to set page to ${pageNumber}`);
    setPage(pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  useResizeObserver(rendererRef, 25, handleResize);

  const setPagedContent = async (htmlContent: string) => {
    const template = document.querySelector<HTMLTemplateElement>('#flow');
    if (template) {
      template.innerHTML = htmlContent;
      const container = pageContainerRef.current;
      const pagedStage = pagedStageRef.current;
      console.log('Destroying previous polisher and chunker');

      // Remove stale paged styles
      const hs = document.getElementsByTagName('style');
      // eslint-disable-next-line no-plusplus
      for (let i = hs.length - 1; i >= 0; --i) {
        if (
          hs[i].getAttribute('data-pagedjs-inserted-styles') === 'true' ||
          hs[i].childNodes.length === 0
        ) {
          hs[i].remove();
        }
      }

      if (polisher.current) polisher.current.destroy();
      if (chunker.current) chunker.current.destroy();
      polisher.current = new Polisher();
      chunker.current = new Chunker();
      if (polisher.current && chunker.current && pagedStage) {
        pagedStage.style.display = '';
        polisher.current.setup();
        initializeHandlers(chunker.current, polisher.current);
        console.log('Adding stylesheet');
        try {
          await polisher.current.add({
            '': styleSheet + customCss,
          });
        } catch (e) {
          console.log('Error adding stylesheet');
        }
        console.log('Starting flow...');
        try {
          await chunker.current.flow(template.content, pagedStage);
        } catch (e) {
          console.log('Error flowing content');
        }

        console.log(
          'Flow complete! Copying flowed content to preview container.'
        );
        pagedStage.style.display = 'none';
        if (container) {
          container.innerHTML = '';
          pagedStage.childNodes.forEach((node) => {
            container.appendChild(node.cloneNode(true));
          });
        }

        //Resize after flow in case the page size changed
        handleResize(rendererRef.current?.offsetHeight || 0, rendererRef.current?.offsetWidth || 0);

        if (container) {
          const paged = container.children[0];
          if (paged) {
            const pageNum = Math.min(page, paged.children.length);
            setPage(pageNum);
            onPageOverflow(pageNum);
            console.log(
              `page is ${page}, max page length: ${paged.children.length}, setting page to ${pageNum}`
            );
            for (let i = 0; i < paged.children.length; i += 1) {
              // eslint-disable-next-line no-continue
              if (i === pageNum - 1) continue;
              (paged.children[i] as HTMLElement).style.display = 'none';
            }
          }
        }
      }
    }
  };

  const updatePreview = async () => {
    if (!buildingPreview.current) {
      buildingPreview.current = true;
      const { previewContent } = useStore.getState();
      console.log('parsing preview content');
      const html = parseChapterContentToHtml(previewContent);
      console.log('setting paged content');
      await setPagedContent(html);
      buildingPreview.current = false;
    }
  };

  const updatePreviewDebounce = useMemo(
    () => debounce(updatePreview, 500, { trailing: true }),
    [page, previewContent, styleSheet, customCss]
  );

  useEffect(() => {
    updatePreviewDebounce();
  }, [previewContent, styleSheet, customCss]);

  return (
    <StyledRenderer ref={rendererRef}>
      <Scaler scale={scale}>
        <PageContainer ref={pageContainerRef} />
      </Scaler>
      <PagedStagingContainer ref={pagedStageRef} />
    </StyledRenderer>
  );
};

export default PagedPreviewer;
