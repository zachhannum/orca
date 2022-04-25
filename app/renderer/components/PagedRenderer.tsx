import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Previewer, Polisher, Chunker, initializeHandlers } from 'pagedjs';
import { baseStylesheet } from '../pagedjs/defaultPageCss';
import { TestContent } from '../pagedjs/test';
import useStore from '../store/useStore';

const StyledRenderer = styled.div`
  height: 50%;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageContainer = styled.div`
  overflow: scroll;
  .pagedjs_page {
    background-color: #ffffff;
  }
  height: var(--pagedjs-height);
  width: var(--pagedjs-width);
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Scaler = styled.div`
  transform: scale(0.5);
`;

// const previewer = new Previewer();
const styleUrl = URL.createObjectURL(
  new Blob([baseStylesheet.toString()], { type: 'text/css' })
);

const PagedRenderer = () => {
  const renderContainer = useRef<HTMLDivElement>(null);
  const previewEnabled = useStore((state) => state.previewEnabled);
  const polisher = useRef<Polisher>(null);
  const chunker = useRef<Chunker>(null);

  const init = async () => {
    const template = document.querySelector<HTMLTemplateElement>('#flow');
    if (template) {
      template.innerHTML = TestContent;
      const container = renderContainer.current;

      if (polisher.current) polisher.current.destroy();
      if (chunker.current) chunker.current.destroy();
      polisher.current = new Polisher();
      chunker.current = new Chunker();
      if (polisher.current && chunker.current) {
        polisher.current.setup();

        initializeHandlers(chunker.current, polisher.current);

        await polisher.current.add({ styleUrl: baseStylesheet.toString() });

        chunker.current.flow(template.content, container);
      }
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewEnabled]);

  return (
    <StyledRenderer>
      <Scaler>
        <PageContainer ref={renderContainer} />
      </Scaler>
    </StyledRenderer>
  );
};

export default PagedRenderer;
