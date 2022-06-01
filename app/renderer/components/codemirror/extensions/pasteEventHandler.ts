import { Extension } from '@codemirror/state'
import { EditorView } from '@codemirror/view'

const pasteEventHandler = (): Extension => {
  return EditorView.domEventHandlers({
    paste(event: ClipboardEvent, view: EditorView) {
        // TODO. Parse HTML to markdown and paste
        // console.log(event.clipboardData?.getData('text/html'));
    }
  })
}

export default pasteEventHandler;