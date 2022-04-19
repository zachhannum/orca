import { AutoformatBlockRule, PlateEditor, unwrapList } from '@udecode/plate';

const clearBlockFormat: AutoformatBlockRule['preFormat'] = (editor) =>
  unwrapList(editor as PlateEditor);

export default clearBlockFormat;
