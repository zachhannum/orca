import {
  EditorState,
  Extension,
  StateEffect,
  StateField,
} from '@codemirror/state';
import { EditorView, getTooltip, showTooltip, Tooltip } from '@codemirror/view';
import { RefObject } from 'react';
import { DefaultTheme } from 'styled-components';
import { getCategoryClassName } from '../language-tool/utils';
import {
  ProofreadUnderlineEffect,
  proofreadUnderlineField,
} from './proofreadUnderlines';

export const proofreadTooltipTheme = (theme: DefaultTheme): Extension => {
  const proofreadCss = EditorView.baseTheme({
    '@keyframes open': {
      from: { opacity: '0', transform: 'scale(0.8)' },
      to: { opacity: '1.0', transform: 'scale(1.0)' },
    },
    '@keyframes close': {
      to: { opacity: '0', transform: 'scale(0.8)' },
      from: { opacity: '1.0', transform: 'scale(1.0)' },
    },
    '@keyframes top': {
      from: { transition: 'top 100ms ease-in-out' },
      to: { transition: 'inherit' },
    },
    '@keyframes bottom': {
      from: { transition: 'top 100ms ease-in-out' },
      to: { transition: 'inherit' },
    },
    '.cm-tooltip.cm-tooltip-proofread': {
      backgroundColor: `${theme.contextMenuBg}`,
      border: `${theme.contextMenuDivider} 1px solid`,
      borderRadius: '10px',
      padding: '5px',
      maxWidth: '200px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2);',
      animation: 'open 0.1s ease-in-out forwards',
      transformOrigin: 'bottom',
      // transition: 'top left 100ms ease-in-out 10ms',
    },
    '.cm-tooltip.cm-tooltip-proofread.cm-tooltip-above': {
      animation: 'top 0.1s ease-in-out forwards',
    },
    '.cm-tooltip.cm-tooltip-proofread.cm-tooltip-below': {
      animation: 'bottom 0.1s ease-in-out forwards',
    },
    '.cm-tooltip-title': {
      color: `${theme.contextMenuFg}`,
      fontSize: '1.1em',
      fontWeight: 'bold',
      padding: '7px',
    },

    '.cm-tooltip-message': {
      color: `${theme.contextMenuFg}`,
      fontSize: '0.9em',
      padding: '7px',
    },
    '.cm-tooltip-suggestion': {
      color: `${theme.buttonPrimaryBg}`,
      padding: '7px',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
      borderRadius: '7px',
      cursor: 'pointer',
    },
  });

  return proofreadCss;
};

const createTooltip = (
  view: EditorView,
  underline: ProofreadUnderlineEffect
) => {
  const { message, shortMessage, replacements, rule } = underline.match;
  const tooltip = document.createElement('div');
  tooltip.className = 'cm-tooltip-proofread';

  if (shortMessage.length) {
    const title = document.createElement('div');
    title.textContent = shortMessage;
    title.className = `cm-tooltip-title ${getCategoryClassName(
      rule.category.id
    )}`;
    tooltip.appendChild(title);
  }

  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageDiv.className = 'cm-tooltip-message';
  tooltip.appendChild(messageDiv);

  const suggestions = replacements?.slice(0, 3);
  if (suggestions) {
    for (const suggestion of suggestions) {
      const suggestionDiv = document.createElement('div');
      suggestionDiv.textContent = suggestion.value;
      suggestionDiv.className = 'cm-tooltip-suggestion';
      suggestionDiv.onclick = () => {
        view.dispatch({
          changes: {
            from: underline.from,
            to: underline.to,
            insert: suggestion.value,
          },
        });
        view.focus();
      };
      tooltip.appendChild(suggestionDiv);
    }
  }

  return tooltip;
};

const markTooltipsForRemoval = (
  view: EditorView,
  state: EditorState,
  tooltips: readonly Tooltip[]
): Tooltip[] => {
  return tooltips.flatMap((tooltip) => {
    if (
      !state.selection.main.empty ||
      !(
        tooltip.pos <= state.selection.main.from &&
        tooltip.end! >= state.selection.main.to
      )
    ) {
      const tooltipView = getTooltip(view, tooltip);
      if (tooltipView) {
        /* tooltipView's animation has finished, we can mark for removal */
        if (tooltipView.dom.style.opacity === '0') {
          return [];
        }
        /* Otherwise, we need to set the animation to close and run it */
        tooltipView.dom.style.animationName = 'close';
        setTimeout(() => {
          tooltipView.dom.style.visibility = 'hidden';
        }, 100);
        return tooltip;
      }
    }
    /* Otherwise, just return the tooltip */
    return tooltip;
  });
};

const getTooltips = (
  tooltips: readonly Tooltip[],
  state: EditorState,
  view: RefObject<EditorView>
): readonly Tooltip[] => {
  let newTooltips = tooltips;
  if (view.current) {
    newTooltips = markTooltipsForRemoval(view.current, state, tooltips);
  }

  const underlines = state.field(proofreadUnderlineField);
  if (
    underlines.size === 0 ||
    state.selection.ranges.length > 1 ||
    state.selection.main.from !== state.selection.main.to
  ) {
    return newTooltips;
  }

  let matchedProofreadUnderline: ProofreadUnderlineEffect | null = null;
  underlines.between(
    state.selection.main.from,
    state.selection.main.to,
    (from, to, value) => {
      matchedProofreadUnderline = {
        from,
        to,
        match: value.spec.match,
      };
    }
  );

  if (matchedProofreadUnderline !== null) {
    const { from, to } = matchedProofreadUnderline;

    // if tooltips exists, and the first tooltip is in range, return tooltips
    if (newTooltips.length) {
      const firstTooltip = newTooltips[0];
      if (firstTooltip.pos === from && firstTooltip.end === to) {
        if (view.current) {
          const tooltipView = getTooltip(view.current, firstTooltip);
          if (tooltipView) {
            tooltipView.dom.style.animationName = 'open';
            tooltipView.dom.style.visibility = 'visible';
          }
        }

        return newTooltips;
      }
    }

    return [
      {
        pos: matchedProofreadUnderline.from,
        end: matchedProofreadUnderline.to,
        above: true,
        strictSide: false,
        arrow: false,
        create: (view) => {
          return {
            dom: createTooltip(view, matchedProofreadUnderline!),
          };
        },
      },
    ];
  }
  return newTooltips;
};

export const proofreadTooltips = (view: RefObject<EditorView>) => {
  return StateField.define<readonly Tooltip[]>({
    create: (state) => getTooltips([], state, view),
    update: (tooltips, tr) => getTooltips(tooltips, tr.state, view),
    provide: (f) => showTooltip.computeN([f], (state) => state.field(f)),
  });
};
