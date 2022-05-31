import type { DefaultTheme } from 'styled-components';
import { tags } from '@lezer/highlight';
import { customTags } from '../markdown';

const headerStyles = (theme: DefaultTheme) => [
  {
    tag: customTags.headerMark,
    color: theme.buttonPrimaryBg,
  },
  {
    tag: tags.heading1,
    fontWeight: '700',
    fontSize: '2em',
  },
  {
    tag: tags.heading2,
    fontWeight: '700',
    fontSize: '1.8em',
  },
  {
    tag: tags.heading3,
    fontWeight: '700',
    fontSize: '1.6em',
  },
  {
    tag: tags.heading4,
    fontWeight: '700',
    fontSize: '1.4em',
  },
  {
    tag: tags.heading5,
    fontWeight: '700',
    fontSize: '1.2em',
  },
  {
    tag: tags.heading6,
    fontWeight: '700',
    fontSize: '1.1em',
  },
];

export default headerStyles;
