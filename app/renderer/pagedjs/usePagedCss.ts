/* eslint-disable import/prefer-default-export */
// js/modules/pagedmakerCSS.js
import useStore from 'renderer/store/useStore';
import { css } from 'styled-components';
import { LeadIn, LineHeight, PageHeader } from 'types/types';

const getLeadInCss = (leadIn: LeadIn) => {
  switch (leadIn) {
    case 'Italics':
      return css`
        font-style: italic;
      `;
    case 'Small Caps':
      return css`
        font-variant: small-caps;
      `;
    case 'None':
    default:
      return css``;
  }
};

const getPageHeader = (pageHeader: PageHeader) => {
  switch (pageHeader) {
    case 'Author Name':
      return css`
        content: '${useStore.getState().authorName}';
      `;
    case 'Book Title':
      return css`
        content: '${useStore.getState().bookTitle}';
      `;
    case 'Chapter Title':
      return css`
        content: string(chapterTitle);
      `;
    case 'None':
    default:
      return ' ';
  }
};

const getLineHeight = (lineHeight: LineHeight) => {
  switch (lineHeight) {
    case 'Single':
      return css`
        line-height: 1;
      `;
    case '1.5':
      return css`
        line-height: 1.5;
      `;
    case 'Double':
      return css`
        line-height: 2;
      `;
    default:
      return css``;
  }
};

const usePagedCss = () => {
  const [
    dropCap,
    leadIn,
    paragraphBreak,
    sceneBreak,
    rectoPageHeaders,
    versoPageHeaders,
    paragraphFont,
    fontSize,
    lineHeight,
    dropFolio,
    topMargin,
    bottomMargin,
    insideMargin,
    outsideMargin,
    trimSize,
  ] = useStore((state) => [
    state.dropCap,
    state.leadIn,
    state.paragraphBreak,
    state.sceneBreak,
    state.rectoPageHeaders,
    state.versoPageHeaders,
    state.paragraphFont,
    state.fontSize,
    state.lineHeight,
    state.dropFolio,
    state.topMargin,
    state.bottomMargin,
    state.insideMargin,
    state.outsideMargin,
    state.trimSize,
  ]);

  return css`
    section p {
      font-family: ${paragraphFont}, serif;
      text-align: justify;
      ${getLineHeight(lineHeight)}
      font-size: ${fontSize}pt;
      orphans: 2;
      widows: 2;
      hyphens: auto;
      text-justify: inter-word;
      font-weight: 400;
      margin: 0px;
      text-indent: 2em;
    }
    blockquote p {
      text-align: left;
      font-style: italic;
      text-indent: unset;
    }
    /* Chapter leader */
    .firstPara::first-line {
      ${getLeadInCss(leadIn)}
    }
    /* Chapter Drop Cap */
    ${dropCap &&
    css`
      .firstPara::first-letter {
        float: left;
        font-size: 5em;
        line-height: 0.65;
        margin: 0.1em 0.1em 0.1em 0;
      }
      .firstPara {
        text-indent: 0em !important;
      }
    `}

    h1 {
      font-family: 'Crimson Pro', serif;
      margin-top: 1.5in;
      font-size: 18pt;
      text-align: center;
      letter-spacing: 0.1em;
      font-weight: 300;
      font-style: normal;
    }

    /* TODO header decorations */
    /* h1::before {
      content: '⁙';
      text-align: center;
      padding: 0.1in;
    }

    h1::after {
      content: '⁙';
      text-align: center;
      padding: 0.1in;
    } */

    h2 {
      font-family: 'Crimson Pro', serif;
      font-size: 15pt;
      text-align: center;
      font-weight: 400;
      letter-spacing: 0.1em;
      margin-bottom: 0.5in;
    }

    @page {
      size: 5.5in 8.25in;
      margin-top: ${topMargin};
      margin-bottom: ${bottomMargin};
      font-family: '${paragraphFont}', serif;
      font-size: ${fontSize}pt;
      user-select: none;
      /* marks: crop; */
    }

    /* TODO this should be more dynamic instead of relying on h1 being the chapter title (it might not always be true!) */
    h1 {
      string-set: chapterTitle content(text);
    }

    @page :left {
      margin-right: ${insideMargin};
      margin-left: ${outsideMargin};

      @top-left {
        vertical-align: center;
        content: counter(page);
      }
      @top-center {
        vertical-align: center;
        ${getPageHeader(versoPageHeaders)};
      }
    }

    @page :right {
      margin-left: ${insideMargin};
      margin-right: ${outsideMargin};

      @top-right {
        vertical-align: center;
        content: counter(page);
      }
      @top-center {
        vertical-align: center;
        ${getPageHeader(rectoPageHeaders)};
      }
    }

    section {
      page: chapter;
    }

    @page chapter:first {
      @top-right {
        content: '';
      }
      @top-left {
        content: '';
      }
      @top-center {
        content: '';
      }
      ${dropFolio &&
      css`
        @bottom-center {
          vertical-align: center;
          content: counter(page);
        }
      `}
    }

    title {
      string-set: title string(text);
    }

    section {
      page-break-after: always;
    }

    hr {
      border: none;
    }

    hr::before {
      content: '${sceneBreak === 'None' ? ' ' : sceneBreak}';
      display: block;
      text-align: center;
    }
  `.join('');
};

export { usePagedCss };
