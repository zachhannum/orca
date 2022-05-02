import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Polisher, Chunker, initializeHandlers } from 'pagedjs';
import { baseStylesheet } from '../pagedjs/defaultPageCss';
import { TestContent } from '../pagedjs/pagedTestContent';
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

type ScalerProps = {
  scale: number;
};
const Scaler = styled.div<ScalerProps>`
  transform: scale(${(p) => p.scale});
`;

type PagedRendererProps = {
  pageNumber: number;
  onPageOverflow: (pageNumber: number) => void;
};

const PagedRenderer = ({ pageNumber, onPageOverflow }: PagedRendererProps) => {
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<HTMLDivElement>(null);
  /* Testing dynamic css changes */
  const printParagraphFontSize = useStore(
    (state) => state.printParagraphFontSize
  );
  // const setPrintParagraphFontSize = useStore(
  //   (state) => state.setPrintParagraphFontSize
  // );
  const polisher = useRef<Polisher>(null);
  const chunker = useRef<Chunker>(null);
  const [scale, setScale] = useState(0.5);
  const [prevPage, setPrevPage] = useState(1);
  const [page, setPage] = useState(1);
  const [overflow, setOverflow] = useState(false);

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
        navigatePage.scrollIntoView();
        const prevPageElement = pageContainer.querySelector<HTMLElement>(
          `[data-page-number="${prevPage}"]`
        );
        setPage(newPage);
        if (prevPageElement && !overflow) {
          prevPageElement.style.display = 'none';
          setPrevPage(newPage);
          setPageCounterIncrement(newPage);
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

  const init = async () => {
    const template = document.querySelector<HTMLTemplateElement>('#flow');
    if (template) {
      template.innerHTML = TestContent;
      const container = pageContainerRef.current;

      if (polisher.current) polisher.current.destroy();
      if (chunker.current) chunker.current.destroy();
      polisher.current = new Polisher();
      chunker.current = new Chunker();
      if (polisher.current && chunker.current && container) {
        polisher.current.setup();
        initializeHandlers(chunker.current, polisher.current);
        await polisher.current.add({
          '': baseStylesheet({
            paragraphFontSize: printParagraphFontSize,
          }).toString(),
        });
        await chunker.current.flow(template.content, container);
        setPage(1);
        setPageCounterIncrement(1);
        onPageOverflow(1);
        const paged = container.children[0];
        if (paged) {
          const pages = paged.children;
          for (let i = 1; i < pages.length; i += 1) {
            (pages[i] as HTMLElement).style.display = 'none';
          }
        }
      }
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [printParagraphFontSize]);

  // const handleFontChange = (increase: boolean) => {
  //   const newFontSize = increase
  //     ? printParagraphFontSize + 1
  //     : printParagraphFontSize - 1;
  //   setPrintParagraphFontSize(newFontSize);
  // };

  return (
    <StyledRenderer ref={rendererRef}>
      <Scaler scale={scale}>
        <PageContainer ref={pageContainerRef} />
      </Scaler>
      {/* <button
        type="button"
        onClick={() => {
          handleFontChange(true);
        }}
      >
        Font +
      </button>
      <button
        type="button"
        onClick={() => {
          handleFontChange(false);
        }}
      >
        Font -
      </button> */}
    </StyledRenderer>
  );
};

export default PagedRenderer;