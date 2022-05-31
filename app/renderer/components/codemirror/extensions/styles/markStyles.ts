import type { DefaultTheme } from 'styled-components';
import { tags } from '@lezer/highlight';
import { customTags } from '../markdown';

const markStyles = (theme: DefaultTheme) => [
  {
    tag: customTags.headerMark,
    color: theme.buttonPrimaryBg,
  },
  {
    tag: tags.emphasis,
    fontStyle: 'italic',
  },
  {
    tag: tags.strong,
    fontWeight: '700',
  },
];

export default markStyles;
