import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Polisher, Chunker, initializeHandlers } from 'pagedjs';
import { baseStylesheet } from '../pagedjs/defaultPageCss';
import { TestContent } from '../pagedjs/test';
import { useResizeObserver } from '../hooks';
import useStore from '../store/useStore';

const StyledRenderer = styled.div`
  height: 70%;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageContainer = styled.div`
  overflow: scroll;
  box-shadow: rgba(0, 0, 0, 0.7) 0px 20px 35px;
  border-radius: 5px;
  .pagedjs_pages {
    display: flex;
    flex-direction: row;
  }
  .pagedjs_page {
    background-color: #ffffff;
  }
  height: var(--pagedjs-height);
  width: var(--pagedjs-width);
  ::-webkit-scrollbar {
    display: none;
  }
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
  const previewEnabled = useStore((state) => state.previewEnabled);
  const polisher = useRef<Polisher>(null);
  const chunker = useRef<Chunker>(null);
  const [scale, setScale] = useState<number>(0.5);
  const [page, setPage] = useState(1);

  const navigateToPage = (newPage: number) => {
    const navigatePage = document.querySelector(
      `[data-page-number="${newPage}"]`
    );
    if (navigatePage) {
      navigatePage.scrollIntoView({ behavior: 'smooth' });
      setPage(newPage);
    } else {
      onPageOverflow(page);
    }
  };

  const handleResize = (height: number, width: number) => {
    if (pageContainerRef.current) {
      setScale(
        Math.min(
          height / pageContainerRef.current.offsetHeight,
          width / pageContainerRef.current.offsetWidth
        )
      );
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
      if (polisher.current && chunker.current) {
        polisher.current.setup();
        initializeHandlers(chunker.current, polisher.current);
        await polisher.current.add({ '': baseStylesheet.toString() });
        chunker.current.flow(template.content, container);
      }
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledRenderer ref={rendererRef}>
      <Scaler scale={scale}>
        <PageContainer ref={pageContainerRef} />
      </Scaler>
    </StyledRenderer>
  );
};

export default PagedRenderer;
