import type { DefaultTheme } from 'styled-components';
import { tags } from '@lezer/highlight';
import { customTags } from '../markdown';

const markStyles = (theme: DefaultTheme) => [
  {
    tag: tags.processingInstruction,
    color: theme.buttonPrimaryBg,
    fontSize: '0.9em',
    fontFamily: theme.editorMonoFont,
  },
  {
    tag: tags.emphasis,
    fontSize: '0.9em',
    fontStyle: 'italic',
    fontFamily: theme.editorMonoFont,
  },
  {
    tag: tags.strong,
    fontSize: '0.9em',
    fontWeight: '700',
    fontFamily: theme.editorMonoFont,
  },
  {
    tag: customTags.codeMark,
    fontSize: '0.9em',
    color: theme.buttonPrimaryBg,
    fontFamily: theme.editorMonoFont,
  },
  {
    tag: customTags.horizontalRule,
    fontSize: '0.9em',
    color: `${theme.buttonPrimaryBg}`,
    fontFamily: theme.editorMonoFont,
  },
];

export default markStyles;
