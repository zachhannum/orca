import { useRef, useEffect } from 'react';
import { Polisher, Chunker, initializeHandlers } from 'pagedjs';
import { TestContent } from '../pagedjs/pagedTestContent';
import { baseStylesheet } from '../pagedjs/defaultPageCss';

const PagedRenderer = () => {
  const pageContainerRef = useRef<HTMLDivElement>(null);

  const polisher = useRef<Polisher>(null);
  const chunker = useRef<Chunker>(null);

  useEffect(() => {
    setPagedContent(TestContent);
  }, []);

  const setPagedContent = async (htmlContent: string) => {
    const template = document.querySelector<HTMLTemplateElement>('#flow');
    console.log(template);
    if (template) {
      template.innerHTML = htmlContent;
      const container = pageContainerRef.current;
      console.log('Destroying previous polisher and chunker');
      if (polisher.current) polisher.current.destroy();
      if (chunker.current) chunker.current.destroy();
      polisher.current = new Polisher();
      chunker.current = new Chunker();
      if (polisher.current && chunker.current) {
        polisher.current.setup();
        initializeHandlers(chunker.current, polisher.current);
        console.log('Adding stylesheet');
        await polisher.current.add({
          '': baseStylesheet({
            paragraphFontSize: 11,
          }).toString(),
        });
        console.log('Starting flow...');
        await chunker.current.flow(template.content, container);
        console.log(
          'Flow complete!'
        );
      }
    }
  };

  return (
    <div ref={pageContainerRef}/>
  );
};

export default PagedRenderer;
