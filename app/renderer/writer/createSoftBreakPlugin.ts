import {
  createPluginFactory,
  PlateEditor,
  HandlerReturnType,
} from '@udecode/plate-core';
import { Transforms, Editor } from 'slate';

export const createSoftBreakPlugin = createPluginFactory({
  key: 'softBreakPlugin',
  handlers: {
    onKeyDown:
      <T = {}>(editor: PlateEditor<T>) =>
      (event: React.KeyboardEvent) => {
        if (event.code === 'Enter') {
          console.log('Inserting Soft Break');
          event.preventDefault();
          event.stopPropagation();
          editor.insertText('\n');
        }
      },
  },
});
