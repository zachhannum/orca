import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

export const proofreadTheme = (): Extension => {
  const proofreadCss = EditorView.baseTheme({
    '.lt-underline': {
      cursor: 'pointer',
      transition: 'background-color 100ms ease-out',
    },

    '.lt-underline.lt-minor': {
      boxShadow: 'inset 0 -2px #e9b35f',
    },

    '.lt-underline.lt-major': {
      boxShadow: 'inset 0 -2px #da615c',
    },

    '.lt-underline.lt-style': {
      boxShadow: 'inset 0 -2px #8981f3',
    },

    '.lt-underline.lt-minor:hover': {
      backgroundColor: '#e9b35f21',
    },

    '.lt-underline.lt-major:hover': {
      backgroundColor: '#da615c21',
    },

    '.lt-underline.lt-style:hover': {
      backgroundColor: '#8981f321',
    },
  });

  return proofreadCss;
};
