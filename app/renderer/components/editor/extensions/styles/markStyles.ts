import type { DefaultTheme } from 'styled-components';
import { tags } from '@lezer/highlight';
import { customTags } from '../markdown';

const markStyles = (theme: DefaultTheme) => [
  {
    tag: tags.processingInstruction,
    color: theme.buttonPrimaryBg,
    fontSize: '0.9em',
    fontFamily:
      'ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro","Fira Mono", "Droid Sans Mono", "Courier New", monospace;',
  },
  {
    tag: tags.emphasis,
    fontSize: '0.9em',
    fontStyle: 'italic',
  },
  {
    tag: tags.strong,
    fontSize: '0.9em',
    fontWeight: '700',
  },
  {
    tag: customTags.codeMark,
    fontSize: '0.9em',
    color: theme.buttonPrimaryBg,
  },
  {
    tag: customTags.horizontalRule,
    fontSize: '0.9em',
    color: `${theme.buttonPrimaryBg}`,
    fontFamily:
      'ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro","Fira Mono", "Droid Sans Mono", "Courier New", monospace;',
  },
];

export default markStyles;
