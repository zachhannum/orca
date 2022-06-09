import { useRef, useEffect, useState, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Polisher, Chunker, initializeHandlers } from 'pagedjs';
import { debounce } from 'lodash';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { rehypeSection } from '../utils/unified';
import { baseStylesheet } from '../pagedjs/defaultPageCss';
import { useResizeObserver } from '../hooks';
import useStore from '../store/useStore';

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

type StyledLoaderProps = {
  loading: boolean;
};

type ScalerProps = {
  scale: number;
};
const Scaler = styled.div<ScalerProps>`
  transform: scale(${(p) => p.scale});
  position: relative;
`;

type PagedRendererProps = {
  pageNumber: number;
  onPageOverflow: (pageNumber: number) => void;
};

const PagedRenderer = ({ pageNumber, onPageOverflow }: PagedRendererProps) => {
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const pagedStageRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<HTMLDivElement>(null);
  /* Testing dynamic css changes */
  const printParagraphFontSize = useStore(
    (state) => state.printParagraphFontSize
  );
  const previewContent = useStore((state) => state.previewContent);
  const activeSectionId = useStore((state) => state.activeSectionId);
  const polisher = useRef<Polisher>(null);
  const chunker = useRef<Chunker>(null);
  const [scale, setScale] = useState(0.5);
  const [prevPage, setPrevPage] = useState(1);
  const [page, setPage] = useState(1);
  const [overflow, setOverflow] = useState(false);
  const buildingPreview = useRef(false);

  const setPageCounterIncrement = (pageIncrement: number) => {
    document.documentElement.style.setProperty(
      '--pagedjs-page-counter-increment',
      `${pageIncrement}`
    );
  };

  useEffect(() => {
    setPage(1);
    onPageOverflow(1);
  }, [activeSectionId]);

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
        if (prevPage != page) {
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

  useResizeObserver(rendererRef, 100, handleResize);

  const setPagedContent = async (htmlContent: string) => {
    const template = document.querySelector<HTMLTemplateElement>('#flow');
    if (template) {
      template.innerHTML = htmlContent;
      const container = pageContainerRef.current;
      const pagedStage = pagedStageRef.current;
      console.log('Destroying previous polisher and chunker');
      if (polisher.current) polisher.current.destroy();
      if (chunker.current) chunker.current.destroy();
      polisher.current = new Polisher();
      chunker.current = new Chunker();
      if (polisher.current && chunker.current && pagedStage) {
        pagedStage.style.display = '';
        polisher.current.setup();
        initializeHandlers(chunker.current, polisher.current);
        console.log('Adding stylesheet');
        await polisher.current.add({
          '': baseStylesheet({
            paragraphFontSize: printParagraphFontSize,
          }).toString(),
        });
        console.log('Starting flow...');
        await chunker.current.flow(template.content, pagedStage);
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
      const html = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeSection)
        .use(rehypeStringify)
        .processSync(previewContent);
      console.log('setting paged content');
      await setPagedContent(html.value.toString());
      buildingPreview.current = false;
    }
  };

  const updatePreviewDebounce = useMemo(
    () => debounce(updatePreview, 500, { trailing: true }),
    [page]
  );

  useEffect(() => {
    updatePreviewDebounce();
  }, [previewContent]);

  return (
    <StyledRenderer ref={rendererRef}>
      <Scaler scale={scale}>
        <PageContainer ref={pageContainerRef} />
      </Scaler>
      <PagedStagingContainer ref={pagedStageRef} />
    </StyledRenderer>
  );
};

export default PagedRenderer;
