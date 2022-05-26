import { createPluginFactory } from '@udecode/plate';
import { decorateMarkdown } from './decorateMarkdown';

export const createMarkdownDecoratePlugin = createPluginFactory({
  key: 'DECORATE_MARKDOWN',
  decorate: decorateMarkdown,
});
