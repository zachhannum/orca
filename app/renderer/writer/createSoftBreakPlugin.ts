import {
  createPluginFactory,
  PlateEditor,
} from '@udecode/plate-core';

export const createSoftBreakPlugin = createPluginFactory({
  key: 'softBreakPlugin',
  handlers: {
    onKeyDown:
      <T = {}>(editor: PlateEditor<T>) =>
      (event: React.KeyboardEvent) => {
        if (event.code === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
          editor.insertText('\n');
        }
      },
  },
});
