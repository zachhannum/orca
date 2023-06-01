import { useEffect, useRef } from 'react';
import styled, { useTheme, css } from 'styled-components';
import { EditorView, gutter, keymap, lineNumbers } from '@codemirror/view';
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from '@codemirror/commands';
import { EditorState } from '@codemirror/state';
import { css as codeMirrorCss } from '@codemirror/lang-css';
import Color from 'color';
import prettier from 'prettier';
import cssParser from 'prettier/parser-postcss';
import useStore from 'renderer/store/useStore';
import { usePagedCss } from 'renderer/pagedjs/usePagedCss';
import { ScrollContainer } from 'renderer/components';
import {
  theme,
  readOnlyLines,
  readOnlyLinesDecoration,
  updateCustomCss,
} from './extensions';

const EditorDiv = styled.div`
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  position: relative;

  .cm-scroller {
    font-size: ${(p) => p.theme.cssEditorFontSize}pt;
    font-family: ${(p) => p.theme.editorMonoFont};
  }
`;

const scrollerCss = css`
  background-color: ${(p) => Color(p.theme.mainBg).darken(0.3).toString()};
  padding: 5px;
  border-radius: 7px;
  overflow-x: auto;
  white-space: nowrap;
`;

export const CssEditor = () => {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const styledTheme = useTheme();
  const pagedCss = usePagedCss();

  const newEditorState = (txt: string, readOnlyPos: number): EditorState => {
    const extensions = [
      lineNumbers(),
      gutter({ class: 'cm-mygutter' }),
      codeMirrorCss(),
      history(),
      readOnlyLines(readOnlyPos),
      readOnlyLinesDecoration(readOnlyPos),
      theme(styledTheme),
      updateCustomCss(readOnlyPos),
      keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
    ];
    return EditorState.create({ doc: txt, extensions });
  };

  const initEditorState = (
    editorContent: string,
    readOnlyPos: number
  ): EditorState => {
    const editorState = newEditorState(editorContent, readOnlyPos);
    return editorState;
  };

  const initEditorView = (editorState: EditorState, readOnlyPos: number) => {
    if (editorContainerRef.current) {
      editorViewRef.current = new EditorView({
        state: editorState,
        parent: editorContainerRef.current,
      });

      /* Dispatch editor selection to move cursor to end of text */
      editorViewRef.current.focus();
      editorViewRef.current.dispatch({
        selection: { anchor: readOnlyPos + 1 },
        scrollIntoView: true,
      });
    }
  };

  useEffect(() => {
    const css = prettier.format(pagedCss, {
      parser: 'css',
      plugins: [cssParser],
    });
    const { customCss } = useStore.getState();
    const editorContent = css + customCss;
    const readOnlyPos = css.length - 1;
    const editorState = initEditorState(editorContent, readOnlyPos);
    initEditorView(editorState, readOnlyPos);
  }, []);

  return (
    <ScrollContainer ref={editorRef} cssMixin={scrollerCss}>
      <EditorDiv ref={editorContainerRef} />
    </ScrollContainer>
  );
};
