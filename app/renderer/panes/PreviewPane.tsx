/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRoot, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import {
  pagedmakerCSSDefault,
  baseStylesheet,
} from '../pagedjs/defaultPageCss';
import useStore from '../store/useStore';
import Test from '../pagedjs/test';

type StyledPaneProps = {
  previewEnabled: boolean;
};

const StyledPane = styled.div<StyledPaneProps>`
  height: 100%;
  width: 600px;
  margin-right: ${(p) => (p.previewEnabled ? '0px' : '-600px')};
  background-color: ${(p) => p.theme.previewBg};
  transition: margin-right 300ms ease-in-out;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const PreviewDiv = styled.div`
  height: 100%;
  width: 100%;
`;

const PreviewPane = () => {
  const previewEnabled = useStore((state) => state.previewEnabled);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function preview() {
      if (previewEnabled) {
        const preview = previewRef.current!;
        const pagedMaker = document.createElement('iframe');
        pagedMaker.style.borderStyle = 'none';
        pagedMaker.style.height = '95%';
        pagedMaker.style.width = '100%';
        pagedMaker.style.opacity = '0';
        pagedMaker.classList.add('pagedPreviewer-previewFrame');

        preview.appendChild(pagedMaker);
        const contentDoc = document.querySelector<HTMLIFrameElement>(
          '.pagedPreviewer-previewFrame'
        )?.contentDocument;
        if (contentDoc) {
          const interfacecss = document.createElement('style');
          interfacecss.textContent = pagedmakerCSSDefault;
          contentDoc.head.appendChild(interfacecss);
          const styleElement = contentDoc.createElement('style');
          styleElement.textContent = baseStylesheet;
          // const article = contentDoc.createElement('article');
          const articleContent =
            document.querySelector<HTMLTemplateElement>('#flow');
          // article.innerHTML = document.querySelector('#flow')?.innerHTML;
          if (articleContent) {
            for (
              let child = articleContent.firstChild;
              child !== null;
              child = child.nextSibling
            ) {
              contentDoc.body.appendChild(child.cloneNode(true));
            }
          }
          const pagedjsscript = document.createElement('script');
          // TODO make local
          pagedjsscript.src =
            'https://unpkg.com/pagedjs/dist/paged.polyfill.js';
          contentDoc.head.appendChild(pagedjsscript);
          setTimeout(() => {
            pagedMaker.style.opacity = '1';
          }, 500);
        }
      }
    }
    setTimeout(() => {
      if (document.querySelector('.pagedPreviewer-previewFrame')) {
        document.querySelector('.pagedPreviewer-previewFrame').remove();
      }
      preview();
    }, 300);
  }, [previewEnabled]);

  return (
    <StyledPane previewEnabled={previewEnabled}>
      <PreviewDiv ref={previewRef} id="PreviewDiv" />
      <Test />
    </StyledPane>
  );
};

export default PreviewPane;
