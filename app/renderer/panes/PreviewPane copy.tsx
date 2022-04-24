/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import {
  Previewer,
  Sheet,
  Polisher,
  Chunker,
  initializeHandlers,
} from 'pagedjs';
import { useFrame } from 'react-frame-component';

import useStore from '../store/useStore';
import Test from '../pagedjs/test';
import '../pagedjs/book.css';
import { StyledFrame } from '../components';

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
`;

const PreviewDiv = styled.div`
  height: 100vw;
  width: 100vh;
  @page {
    size: 5in 8in;
    margin: 0.5in;
    margin-top: 0.75in;
    /* marks: crop; */

    @footnote {
      margin: 0.6em 0 0 0;
      padding: 0.3em 0 0 0;
      max-height: 10em;
    }

    @top-center {
      vertical-align: bottom;
      padding-bottom: 0.25in;
      content: string(booktitle);
    }
  }

  @page :left {
    margin-right: 0.75in;

    @top-left {
      vertical-align: bottom;
      padding-bottom: 10mm;
      content: string(page-number, first-except);
      letter-spacing: 0.1em;
      margin-left: -1em;
      font-size: 0.9em;
    }

    @bottom-left-corner {
      content: counter(page);
    }
  }

  @page :right {
    margin-left: 0.75in;

    @top-right {
      vertical-align: bottom;
      padding-bottom: 10mm;
      content: string(page-number, first-except);
      letter-spacing: 0.08em;
      margin-right: -1em;
      font-size: 0.9em;
    }

    @bottom-right-corner {
      content: counter(page);
    }

    @top-center {
      content: string(booktitle);
    }
  }

  @page cover {
    @top-center {
      content: none;
    }
  }

  .Chapter-rw {
    page: chapter;
  }

  @page chapter:first {
    @bottom-right-corner {
      content: '';
    }
    @bottom-left-corner {
      content: '';
    }
  }

  section:nth-child(1) h1 {
    string-set: booktitle content(text);
  }

  section {
    break-before: right;
    break-after: always;
  }

  .pagedjs_page {
    background-color: #f8f4ef;
    flex: none;
    scroll-snap-align: start;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .pagedjs_pages {
    width: calc(var(--pagedjs-width));
    height: calc(var(--pagedjs-height));
    transform: scale(0.5) translate(0in, 0px) !important;
    transform-origin: center center;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    justify-content: flex-start;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2),
      0 20px 40px 0 rgba(0, 0, 0, 0.19);
  }
`;

const FrameHelper = ({ previewRef }) => {
  const { document, window } = useFrame();

  const previewEnabled = useStore((state) => state.previewEnabled);
  const polisher = useRef<Polisher>(null);
  const chunker = useRef<Chunker>(null);

  useEffect(() => {
    const preview = async () => {
      if (previewEnabled) {
        const flowText = document.querySelector('#flow');
        console.log(flowText);
        console.log(previewRef);

        let pagedjsscript = document.createElement('script');
        pagedjsscript.src = 'https://unpkg.com/pagedjs/dist/paged.polyfill.js';
        document.head.appendChild(pagedjsscript);

        // polisher.current = new Polisher();
        // chunker.current = new Chunker(flowText, previewRef);

        // const lPolisher = polisher.current!;
        // const lChunker = chunker.current!;

        // lPolisher.setup();
        // initializeHandlers(lChunker, lPolisher);
        // let paged = new Previewer();
        // console.log(typeof bookCss);
        // await paged.preview(flowText, [], previewRef);
        // const textCss = await lPolisher.convertViaSheet(bookCss, '');
        // lPolisher.insert(textCss);
        // await chunker.current.flow(flowText, previewRef.current);
        // const path = window.require('path');
        // await polisher.current.add(
        // path.join(process.resourcesPath, 'book.css')
        // );
        // console.log(__dirname);
        // if (previewRef.childElementCount > 1) {
        //   previewRef.removeChild(previewRef.lastChild);
        // }
      }
      // } else if (previewRef.firstChild) {
      //   const lPolisher = polisher.current!;
      //   const lChunker = chunker.current!;
      // lPolisher.destroy();
      // lChunker.destroy();
      // previewRef.current.removeChild(previewRef.current.firstChild);
      // }
    };

    preview();
  }, [previewEnabled]);

  return <div />;
};

const PreviewPane = () => {
  const previewEnabled = useStore((state) => state.previewEnabled);
  const previewRef = useRef<HTMLDivElement>(null);
  const FrameStyle = {
    height: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
  };

  return (
    <StyledPane previewEnabled={previewEnabled}>
      <StyledFrame style={FrameStyle}>
        {/* <PreviewDiv ref={previewRef} id="PreviewDiv"> */}
        <div>
          <Test />
          <FrameHelper previewRef={previewRef.current} />
        </div>
        {/* </PreviewDiv> */}
      </StyledFrame>
    </StyledPane>
  );
};

export default PreviewPane;
