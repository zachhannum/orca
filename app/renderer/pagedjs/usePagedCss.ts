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
  const [publishSettings] = useStore((state) => [state.publishSettings]);

  return css`
    section p {
      text-align: justify;
      ${getLineHeight(publishSettings.lineHeight)}
      font-size: ${publishSettings.fontSize}pt;
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
      ${getLeadInCss(publishSettings.leadIn)}
    }
    /* Chapter Drop Cap */
    ${publishSettings.dropCap &&
    css`
      .firstPara::first-letter {
        ${publishSettings.dropCapFont.length > 0 &&
        css`
          font-family: '${publishSettings.dropCapFont}', serif;
        `}
        float: left;
        font-size: 5em;
        font-variant: normal;
        font-style: normal;
        margin: 0.1em 0.1em 0.1em 0;

        ${publishSettings.dropCapEnableAdvancedSettings
          ? css`
              line-height: ${publishSettings.dropCapLineHeight};
              margin-bottom: ${publishSettings.dropCapBottomMargin}em;
            `
          : css`
              line-height: 0.65;
            `}
      }
      .firstPara {
        text-indent: 0em !important;
      }
    `}

    h1 {
      font-family: '${publishSettings.paragraphFont}', serif;
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
      font-family: '${publishSettings.paragraphFont}', serif;
      font-size: 15pt;
      text-align: center;
      font-weight: 400;
      letter-spacing: 0.1em;
      margin-bottom: 0.5in;
    }

    @page {
      size: 5.5in 8.25in;
      margin-top: ${publishSettings.topMargin}in;
      margin-bottom: ${publishSettings.bottomMargin}in;
      font-family: '${publishSettings.paragraphFont}', serif;
      font-size: ${publishSettings.fontSize}pt;
      user-select: none;
      /* marks: crop; */
    }

    /* TODO this should be more dynamic instead of relying on h1 being the chapter title (it might not always be true!) */
    h1 {
      string-set: chapterTitle content(text);
    }

    @page :left {
      margin-right: ${publishSettings.insideMargin}in;
      margin-left: ${publishSettings.outsideMargin}in;

      @top-left {
        vertical-align: center;
        content: counter(page);
      }
      @top-center {
        vertical-align: center;
        ${getPageHeader(publishSettings.versoPageHeaders)};
      }
    }

    @page :right {
      margin-left: ${publishSettings.insideMargin}in;
      margin-right: ${publishSettings.outsideMargin}in;

      @top-right {
        vertical-align: center;
        content: counter(page);
      }
      @top-center {
        vertical-align: center;
        ${getPageHeader(publishSettings.rectoPageHeaders)};
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
      ${publishSettings.dropFolio &&
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
      content: ${publishSettings.sceneBreak === 'None'
        ? ' '
        : `'${publishSettings.sceneBreak}'`};
      display: block;
      text-align: center;
    }
  `.join('');
};

export { usePagedCss };
