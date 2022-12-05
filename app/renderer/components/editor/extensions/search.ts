import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { search as codemirrorSearch } from '@codemirror/search';
import Color from 'color';
import type {DefaultTheme} from 'styled-components';

const search = (theme: DefaultTheme): Extension => {
  const searchTheme = EditorView.baseTheme({
    '.cm-panels': {
      backgroundColor: `${Color(theme.contextMenuBg).alpha(1).hsl().string()}`,
      borderRadius: '10px 10px 0px 0px',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      padding: '10px',
      userSelect: 'none',
    },
    '.cm-panels-bottom': {
      borderTop: 'unset',
    },
    '.cm-textfield, ::placeholder': {
      color: `${theme.textInputPlaceholderFg['altTwo']}`,
    },
    '.cm-textfield': {
      backgroundColor: `${theme.textInputBg['altTwo']}`,
      color: `${theme.mainFgTextSecondary}`,
      border: 'unset',
      borderRadius: '5px',
      fontSize: '1em',
      '&:focus': {
        outline: 'none',
        backgroundColor: `${Color(theme.textInputBg['altTwo']).lighten(0.2).hsl().string()}`,
      },
    },
    '.cm-button': {
      all: 'unset',
      backgroundColor: `${Color(theme.contextMenuBg).lighten(0.3).alpha(1).hsl().string()}`,
      color: `${theme.buttonPrimaryText}`,
      padding: '0px 5px',
      fontFamily: 'Poppins',
      fontSize: '0.8em',
      borderRadius: '5px',
      margin: '0.2em 0.6em 0.2em 0',
      transition: 'background-color 200ms ease-in-out',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: `${Color(theme.contextMenuBg).lighten(0.5).alpha(1).hsl().string()}`,
      },
      '&:active': {
        backgroundColor: `${Color(theme.contextMenuBg).lighten(0.1).alpha(1).hsl().string()}`,
      },
    },
    '.cm-panel.cm-search label': {
      color: `${theme.contextMenuFg}`,
      cursor: `pointer`,
      display: 'inline-flex',
      alignItems: 'center',
    },
    '.cm-panel.cm-search input[type=checkbox]': {
      '&:focus': {
        outline: 'none',
      },
    },
    '.cm-panel.cm-search [name=close]': {
      color: `${theme.contextMenuFg}`,
      cursor: 'pointer',
      '&:hover': {
        color: `${Color(theme.contextMenuFg).lighten(0.2).hsl().string()}`,
      },
      '&:active': {
        color: `${Color(theme.contextMenuFg).darken(0.2).hsl().string()}`,
      },
    },
    '.cm-searchMatch': {
      backgroundColor: `${theme.contextMenuBg}`,
    },
    '.cm-searchMatch-selected': {
      backgroundColor: `${theme.buttonPrimaryBg}`,
    },
  });
  return [searchTheme, codemirrorSearch()];
};

export default search;
