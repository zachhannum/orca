import { useEffect, useRef, useState } from 'react';
import styled, { useTheme, css } from 'styled-components';
import { EditorView, keymap } from '@codemirror/view';
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
  indentSelection,
} from '@codemirror/commands';
import { EditorState, StateEffect } from '@codemirror/state';
import Color from 'color';
import prettier from 'prettier';
import cssParser from 'prettier/parser-postcss';
import useStore from 'renderer/store/useStore';
import { usePagedCss } from 'renderer/pagedjs/usePagedCss';
import { ScrollContainer } from 'renderer/components';
import { theme } from './extensions';
import { readOnlyLines } from './extensions/readOnlyLines';

const EditorDiv = styled.div`
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  position: relative;

  .cm-scroller {
    font-size: ${(p) => p.theme.editorFontSize}pt;
  }
`;

const scrollerCss = css`
  background-color: ${(p) => Color(p.theme.mainBg).darken(0.3).toString()};
  margin: 5px;
  border-radius: 5px;
  overflow-x: auto;
  /* width: 800px; */
  white-space: nowrap;
`;

export const CssEditor = () => {
  const [settings] = useStore((state) => [state.settings]);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const styledTheme = useTheme();
  const pagedCss = usePagedCss();

  const newEditorState = (txt: string): EditorState => {
    const extensions = [
      history(),
      readOnlyLines(txt.length - 1),
      theme(styledTheme),
      keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
    ];
    return EditorState.create({ doc: txt, extensions });
  };

  const initEditorState = (editorContent: string): EditorState => {
    const editorState = newEditorState(editorContent);
    return editorState;
  };

  const initEditorView = (editorState: EditorState) => {
    if (editorContainerRef.current) {
      editorViewRef.current = new EditorView({
        state: editorState,
        parent: editorContainerRef.current,
      });
    }
  };

  useEffect(() => {
    const css = prettier.format(pagedCss, {
      parser: 'css',
      plugins: [cssParser],
    });
    const editorState = initEditorState(css);
    initEditorView(editorState);
  }, []);

  return (
    <ScrollContainer ref={editorRef} cssMixin={scrollerCss}>
      <EditorDiv ref={editorContainerRef} />
    </ScrollContainer>
  );
};
