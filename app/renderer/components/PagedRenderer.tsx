import { useRef, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { Polisher, Chunker, initializeHandlers } from 'pagedjs';

const Test = styled.div`
  font-family: 'Poppins' sans-serif;
  display: flex;
  color: red;
`

const PagedRenderer = () => {
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const pagedStageRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<HTMLDivElement>(null);

  const polisher = useRef<Polisher>(null);
  const chunker = useRef<Chunker>(null);

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
        // await polisher.current.add({
        //   '': baseStylesheet({
        //     paragraphFontSize: printParagraphFontSize,
        //   }).toString(),
        // });
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
      }
    }
  };

  return (
    <Test>This is a Test</Test>
  );
};

export default PagedRenderer;
