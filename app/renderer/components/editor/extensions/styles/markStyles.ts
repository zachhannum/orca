import type { DefaultTheme } from 'styled-components';
import { tags } from '@lezer/highlight';
import { customTags } from '../markdown';

const markStyles = (theme: DefaultTheme) => [
  {
    tag: tags.processingInstruction,
    color: theme.buttonPrimaryBg,
    fontFamily: 'Roboto Mono',
  },
  {
    tag: tags.emphasis,
    fontStyle: 'italic',
  },
  {
    tag: tags.strong,
    fontWeight: '700',
  },
  {
    tag: customTags.codeMark,
    color: theme.buttonPrimaryBg,
  },
  {
    tag: customTags.horizontalRule,
    color: `${theme.buttonPrimaryBg}`,
    fontFamily: 'Roboto Mono'
  }
];

export default markStyles;
