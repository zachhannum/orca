/* eslint-disable import/prefer-default-export */
// js/modules/pagedmakerCSS.js
import { css } from 'styled-components';

const baseStylesheet = css`
  section p {
    font-family: 'Crimson Pro', serif;
    text-align: justify;
  }

  @page {
    size: 5in 8in;
    margin: 0.5in;
    margin-top: 0.75in;
    font-family: 'Crimson Pro', serif;
    font-size: 12pt;
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
      padding-bottom: 10mm;
      content: string(page-number, first-except);
      letter-spacing: 0.1em;
      margin-left: -1em;
      font-size: 0.9em;
    }

    @bottom-left {
      content: counter(page);
    }
  }

  @page :right {
    margin-left: 0.75in;

    @top-right {
      vertical-align: bottom;
      padding-bottom: 10mm;
      letter-spacing: 0.08em;
      margin-right: -1em;
      font-size: 0.9em;
    }
    @bottom-right {
      content: counter(page);
    }
  }

  section {
    page: chapter;
  }

  @page :first {
    @bottom-right {
      content: '';
    }
    @bottom-left {
      content: '';
    }
  }

  title {
    string-set: title string(text);
  }

  section {
    page-break-after: always;
  }
`;

export { baseStylesheet };
