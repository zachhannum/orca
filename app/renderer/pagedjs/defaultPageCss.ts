// js/modules/pagedmakerCSS.js
const pagedmakerCSSDefault = `
/* Change the look */
:root{
    --color-background:  transparent;
    --color-pageBox: #666;
    --color-paper: white;
    --color-marginBox: transparent;
  }

  body {
    height: 100%;
    width: 100%;
    margin: 0px;
  }

  ::-webkit-scrollbar {
    display: none;
  }


  /* To define how the book look on the screen: */
  @media screen {
    body {
        background-color: var(--color-background);
    }
    .pagedjs_pages {
        overflow-y: hidden;
        transform: scale(.5) translate(0in,0in);
        width: var(--pagedjs-width-right);
        height: var(--pagedjs-height-right);
        display: flex;
        flex-direction: row;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        margin: 0 auto;
    }
    .pagedjs_page {
        background-color: #fff;
        box-shadow: 0 0 0 1px var(--color-pageBox);
        scroll-snap-align: start;
        margin: 0;
        flex-shrink: 0;
        flex-grow: 0;
    }
    .pagedjs_first_page {
      margin-left: 0;
    }

  }
`;

const baseStylesheet = `

@import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;1,400;1,500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&display=swap');
@media print {

.pagedPreviewer-modal, .pagedPreviewer-button-modal {
    display: none;
}

body, html {
    margin: 0;
    padding: 0;
}

@page {
    size: 5in 8in;
    margin: .5in;
    margin-top: .75in;
    @bottom-right{
        content: counter(page) "/" counter(pages);
    }
    @bottom-left {
        content: string(text)
    }
}

title {
    string-set: title string(text);
}



h1,h2 {

    text-transform: uppercase;
    border-bottom: 1px solid black;
}

}

`;

export { pagedmakerCSSDefault };
export { baseStylesheet };
