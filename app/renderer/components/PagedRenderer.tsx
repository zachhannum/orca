import { useRef, useEffect } from 'react';
import { Polisher, Chunker, initializeHandlers } from 'pagedjs';
import { PagedBookContents } from 'types/types';

const PagedRenderer = () => {
  const pageContainerRef = useRef<HTMLDivElement>(null);

  const polisher = useRef<typeof Polisher>(null);
  const chunker = useRef<typeof Chunker>(null);

  useEffect(() => {
    console.log('Setting paged content listener');
    window.electron.ipcRenderer.once('pagedContents', (arg) => {
      const { html, css } = arg as PagedBookContents;
      console.log(html);
      setPagedContent(html, css);
    });
  }, []);

  const setPagedContent = async (html: string, css: string) => {
    const template = document.querySelector<HTMLTemplateElement>('#flow');
    console.log(template);
    if (template) {
      template.innerHTML = html;
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
          '': css,
        });
        console.log('Starting flow...');
        await chunker.current.flow(template.content, container);
        console.log('Flow complete!');
        window.pagedApi.pagedRenderComplete();
      }
    }
  };

  return <div ref={pageContainerRef} />;
};

export default PagedRenderer;
