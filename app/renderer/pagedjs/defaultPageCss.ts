/* eslint-disable import/prefer-default-export */
// js/modules/pagedmakerCSS.js
import { css } from 'styled-components';

type StylesheetProps = {
  paragraphFontSize: number;
};

const baseStylesheet = ({ paragraphFontSize }: StylesheetProps) =>
  css`
    section p {
      font-family: 'Crimson Pro', serif;
      text-align: justify;
      line-height: 1.5;
      font-size: ${paragraphFontSize}pt;
      orphans: 2;
      widows: 2;
      hyphens: auto;
      text-justify: inter-word;
      font-weight: 400;
      margin: 0px;
      text-indent: 2em;
    }
    /* Chapter leader */
    .firstPara::first-line {
      font-style: italic;
    }
    /* Chapter Drop Cap */
    .firstPara::first-letter {
      float: left;
      font-size: 5em;
      line-height: 0.65;
      margin: 0.1em 0.1em 0.1em 0;
    }
    h1 {
      font-family: 'Crimson Pro', serif;
      margin-top: 1.5in;
      font-size: 15pt;
      text-align: center;
      letter-spacing: 0.1em;
      font-weight: 300;
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

export { baseStylesheet };
