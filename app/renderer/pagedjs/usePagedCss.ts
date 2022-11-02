/* eslint-disable import/prefer-default-export */
// js/modules/pagedmakerCSS.js
import useStore from 'renderer/store/useStore';
import { css } from 'styled-components';
import { LeadIn } from 'types/types';

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
      line-height: 1.5;
      font-size: ${fontSize}pt;
      orphans: 3;
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
      font-size: 15pt;
      text-align: center;
      letter-spacing: 0.1em;
      font-weight: 300;
      font-style: normal;
    }

    h1::before {
      content: '⁙';
      text-align: center;
      padding: 0.1in;
    }

    h1::after {
      content: '⁙';
      text-align: center;
      padding: 0.1in;
    }

    h2 {
      font-family: 'Crimson Pro', serif;
      font-size: 18pt;
      text-align: center;
      font-weight: 400;
      letter-spacing: 0.1em;
      margin-bottom: 0.5in;
    }

    @page {
      size: 5.5in 8.25in;
      margin: 0.5in;
      margin-top: 0.75in;
      font-family: 'Crimson Pro', serif;
      font-size: 12pt;
      user-select: none;
      /* marks: crop; */

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
        padding-bottom: 0.1in;
        content: counter(page);
      }
    }

    @page :right {
      margin-left: 0.75in;
      @top-right {
        vertical-align: bottom;
        padding-bottom: 0.1in;
        content: counter(page);
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
      @bottom-center {
        vertical-align: top;
        padding-top: 0.05in;
        content: counter(page);
      }
      margin-bottom: 0.75in;
    }

    title {
      string-set: title string(text);
    }

    section {
      page-break-after: always;
    }
  `.join('');
};

export { usePagedCss };
