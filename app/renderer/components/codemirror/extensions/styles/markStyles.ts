import type { DefaultTheme } from 'styled-components';
import { tags } from '@lezer/highlight';
import Color from 'color';
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
    tag: customTags.inlineCode,
    backgroundColor: `${Color(theme.mainBg).darken(0.2)}`,

  },
  {
    tag: customTags.codeMark,
    backgroundColor: `${Color(theme.mainBg).darken(0.2)}`,
    paddingLeft: '5px',
    paddingRight: '5px',
    borderRadius: '5px',
    color: theme.buttonPrimaryBg,
  }
];

export default markStyles;
