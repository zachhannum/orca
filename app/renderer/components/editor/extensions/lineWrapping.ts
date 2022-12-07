import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

const lineWrapping = (): Extension => {
  return EditorView.lineWrapping;
};

export default lineWrapping;
