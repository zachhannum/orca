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
  height: 70%;
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

const StyledLoader = styled.div<StyledLoaderProps>`
  position: absolute;
  height: var(--pagedjs-height);
  width: var(--pagedjs-width);
  ${(p) =>
    p.loading
      ? css`
          background-color: #00000052;
        `
      : css`
          background-color: #0000000;
        `}
  transition: background-color 100ms ease-in-out;
`;

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
  const polisher = useRef<Polisher>(null);
  const chunker = useRef<Chunker>(null);
  const [scale, setScale] = useState(0.5);
  const [prevPage, setPrevPage] = useState(1);
  const [page, setPage] = useState(1);
  const [overflow, setOverflow] = useState(false);
  const [loading, setLoading] = useState(false);

  const setPageCounterIncrement = (pageIncrement: number) => {
    document.documentElement.style.setProperty(
      '--pagedjs-page-counter-increment',
      `${pageIncrement}`
    );
  };

  const navigateToPage = (newPage: number, _instant = false) => {
    const pageContainer = pageContainerRef.current;
    if (pageContainer) {
      const navigatePage = pageContainer.querySelector<HTMLElement>(
        `[data-page-number="${newPage}"]`
      );
      if (navigatePage) {
        navigatePage.style.display = '';
        console.log(navigatePage);
        navigatePage.scrollIntoView();
        const prevPageElement = pageContainer.querySelector<HTMLElement>(
          `[data-page-number="${prevPage}"]`
        );
        setPage(newPage);
        if (prevPageElement && !overflow) {
          // prevPageElement.style.display = 'none';
          setPrevPage(newPage);
          // setPageCounterIncrement(newPage);
        } else if (overflow) {
          setOverflow(false);
        }
      } else if (newPage !== 1) {
        /* There should be always at least one page, so no overflow on page 1 */
        setOverflow(true);
        onPageOverflow(page);
      }
    }
  };

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
    navigateToPage(pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  useResizeObserver(rendererRef, handleResize);

  const setPagedContent = async (htmlContent: string) => {
    const template = document.querySelector<HTMLTemplateElement>('#flow');
    if (template) {
      const loadingTimer = setTimeout(() => setLoading(true), 200);
      template.innerHTML = htmlContent;
      const container = pageContainerRef.current;
      const pagedStage = pagedStageRef.current;

      if (polisher.current) polisher.current.destroy();
      if (chunker.current) chunker.current.destroy();
      polisher.current = new Polisher();
      chunker.current = new Chunker();
      if (polisher.current && chunker.current && pagedStage) {
        polisher.current.setup();
        initializeHandlers(chunker.current, polisher.current);
        await polisher.current.add({
          '': baseStylesheet({
            paragraphFontSize: printParagraphFontSize,
          }).toString(),
        });
        await chunker.current.flow(template.content, pagedStage);
        if (container) {
          container.innerHTML = '';
          pagedStage.childNodes.forEach((node) => {
            container.appendChild(node.cloneNode(true));
          });
        }
        setLoading(false);
        clearTimeout(loadingTimer);

        // const paged = container.children[0];
        // if (paged) {
        //   // for (let i = 1; i < pages.length; i += 1) {
        //   //   (pages[i] as HTMLElement).style.display = 'none';
        //   // }
        //   console.log(page);
        //   console.log(paged.children.length);
        //   // onPageOverflow(Math.min(page, paged.children.length));
        //   navigateToPage(Math.min(page, paged.children.length));
        // }
        // setPage(1);
        onPageOverflow(1);
        navigateToPage(1);
        // setPageCounterIncrement(1);
      }
    }
  };

  const updatePreview = () => {
    const { previewContent } = useStore.getState();
    console.log(previewContent);
    const html = unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSection)
      .use(rehypeStringify)
      .processSync(previewContent);
    console.log(html);
    setPagedContent(html.value.toString());
  };

  const updatePreviewDebounce = useMemo(
    () => debounce(updatePreview, 500, { leading: true, trailing: true }),
    [page]
  );

  useEffect(() => {
    updatePreviewDebounce();
  }, [previewContent]);

  return (
    <StyledRenderer ref={rendererRef}>
      <Scaler scale={scale}>
        <StyledLoader loading={loading} />
        <PageContainer ref={pageContainerRef} />
      </Scaler>
      <PagedStagingContainer ref={pagedStageRef} />
    </StyledRenderer>
  );
};

export default PagedRenderer;
