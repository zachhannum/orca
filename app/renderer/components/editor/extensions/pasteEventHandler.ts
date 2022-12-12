import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkStringify from 'remark-stringify';
import rehypeRemoveComments from 'rehype-remove-comments';

const pasteEventHandler = (): Extension => {
  return EditorView.domEventHandlers({
    paste(event: ClipboardEvent, view: EditorView) {
      const html = event.clipboardData?.getData('text/html');
      if (html) {
        event.preventDefault();
        const markdown = unified()
          .use(rehypeParse, { fragment: true })
          .use(rehypeRemoveComments)
          .use(rehypeRemark)
          .use(remarkStringify)
          .processSync(html).value.toString();
        view.dispatch({
          changes: {
            from: view.state.selection.main.from,
            to: view.state.selection.main.to,
            insert: markdown,
          },
          selection: { anchor: view.state.selection.main.from + markdown.length - 1},
          scrollIntoView: true,
        });
      }
    },
  });
};

export default pasteEventHandler;
