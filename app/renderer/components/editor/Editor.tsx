import { useEffect, useRef, useState } from 'react';
import styled, { useTheme, css } from 'styled-components';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { searchKeymap } from '@codemirror/search';
import { EditorState, StateEffect } from '@codemirror/state';
import useStore from 'renderer/store/useStore';
import { ScrollContainer } from 'renderer/components';
import { findItemDeep } from '../TreeView/utilities';
import {
  theme,
  lineWrapping,
  markdown,
  updateSectionContent,
  hideMarkdown,
  blockquote,
  code,
  pasteEventHandler,
  search,
  placeholder,
  countWords,
  proofreadTheme,
  proofreadUnderlineField,
  cancelProofreadOnChange,
  proofreadUnderlineCount,
  proofreadTooltipTheme,
  proofreadTooltipHelper,
} from './extensions';
import EditorToolbar from './EditorToolbar';
import { TooltipView } from './TooltipView';
import { addProofreadUnderline } from './extensions/proofreadUnderlines';
import { checkText } from './language-tool/api';
import { TooltipLocation } from './extensions/proofreadTooltipHelper';

const EditorDiv = styled.div`
  width: 100%;
  margin: auto;
  max-width: 650px;
  min-height: 100%;
  box-sizing: border-box;
  padding-top: 4vh;
  padding-bottom: 10vh;
  position: relative;
`;

const scrollerCss = (sidebarOpen: boolean) => css`
  padding-right: 50px;
  padding-left: ${sidebarOpen ? '50px' : '125px'};
  margin-right: 5px;
  transition: all 300ms ease-in-out;
  margin-bottom: 10px;
`;

const Editor = () => {
  const activeSectionId = useStore((state) => state.activeSectionId);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const styledTheme = useTheme();
  const sidebarOpen = useStore((state) => state.sidebarOpen);
  const [wordCount, setWordCount] = useState(0);
  const [isProofreading, setIsProofreading] = useState(false);
  const [numProofreadingMatches, setNumProofreadingMatches] = useState(0);
  const proofreadAbortController = useRef<AbortController | null>(null);
  const [currentTooltipLocation, setCurrentTooltipLocation] =
    useState<TooltipLocation | null>(null);

  const handleProofreadRequest = () => {
    setIsProofreading(true);
    const abortController = new AbortController();
    proofreadAbortController.current = abortController;
    const { previewContent } = useStore.getState();
    const { signal } = abortController;
    checkText(previewContent, signal)
      .then((result) => {

        const effects: StateEffect<any>[] = [];

        if (result.matches) {
          for (const match of result.matches) {
            const start = match.offset;
            const end = match.offset + match.length;

            effects.push(
              addProofreadUnderline.of({
                from: start,
                to: end,
                match,
              })
            );
          }
        }

        if (effects.length && editorViewRef.current) {
          editorViewRef.current.dispatch({
            effects,
          });
        }
        setIsProofreading(false);
        return null;
      })
      .catch((e) => {
        console.error(e);

        setIsProofreading(false);
      });
  };

  const newEditorState = (txt: string): EditorState => {
    const extensions = [
      theme(styledTheme),
      lineWrapping(),
      updateSectionContent(activeSectionId),
      search(styledTheme),
      markdown(),
      hideMarkdown(styledTheme),
      blockquote(styledTheme),
      code(styledTheme),
      history(),
      pasteEventHandler(),
      placeholder(),
      countWords(setWordCount),
      proofreadUnderlineField,
      proofreadTooltipHelper((tooltip) => {
        setCurrentTooltipLocation(tooltip);
      }),
      proofreadUnderlineCount((count) => {
        setNumProofreadingMatches(count);
      }),
      proofreadTheme(),
      proofreadTooltipTheme(styledTheme),
      cancelProofreadOnChange(proofreadAbortController),
      keymap.of([...defaultKeymap, ...historyKeymap, ...searchKeymap]),
    ];
    return EditorState.create({ doc: txt, extensions });
  };

  const initEditorState = (editorContent: string): EditorState => {
    const editorState = newEditorState(editorContent);
    const { setEditorState } = useStore.getState();
    setEditorState(activeSectionId, editorState);
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

  /* Set Active Section Id */
  useEffect(() => {
    if (activeSectionId !== '' && editorContainerRef.current) {
      const { content } = useStore.getState();
      const sectionContent = findItemDeep(content, activeSectionId)?.content;
      const editorContent = sectionContent === undefined ? '' : sectionContent;
      if (editorViewRef.current) {
        const { editorStateMap } = useStore.getState();
        const editorState = editorStateMap.get(activeSectionId);
        if (editorState) {
          editorViewRef.current.setState(editorState);
        } else {
          const editorState = initEditorState(editorContent);
          editorViewRef.current.setState(editorState);
        }
      } else {
        const editorState = initEditorState(editorContent);
        initEditorView(editorState);
      }
    }
  }, [activeSectionId]);

  return (
    <ScrollContainer ref={editorRef} cssMixin={scrollerCss(sidebarOpen)}>
      <EditorDiv ref={editorContainerRef}>
        <TooltipView
          tooltip={currentTooltipLocation}
          editorView={editorViewRef.current}
          viewRef={editorRef}
        />
      </EditorDiv>
      <EditorToolbar
        editorView={editorViewRef.current}
        wordCount={wordCount}
        onProofread={handleProofreadRequest}
        proofreading={isProofreading}
        numProofreadingMatches={numProofreadingMatches}
      />
    </ScrollContainer>
  );
};

export default Editor;
