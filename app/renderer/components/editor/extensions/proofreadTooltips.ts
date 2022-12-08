import { EditorState, Extension, StateField } from '@codemirror/state';
import { EditorView, showTooltip, Tooltip } from '@codemirror/view';
import { DefaultTheme } from 'styled-components';
import { getCategoryClassName } from '../language-tool/utils';
import {
  ProofreadUnderlineEffect,
  proofreadUnderlineField,
} from './proofreadUnderlines';

export const proofreadTooltipTheme = (theme: DefaultTheme): Extension => {
  const proofreadCss = EditorView.baseTheme({
    '.cm-tooltip.cm-tooltip-proofread': {
      backgroundColor: `${theme.contextMenuBg}`,
      border: `${theme.contextMenuDivider} 1px solid`,
      borderRadius: '10px',
      padding: '5px',
      maxWidth: '200px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2);',
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

const getTooltip = (
  tooltips: readonly Tooltip[],
  state: EditorState
): readonly Tooltip[] => {
  const underlines = state.field(proofreadUnderlineField);

  if (
    underlines.size === 0 ||
    state.selection.ranges.length > 1 ||
    state.selection.main.from !== state.selection.main.to ||
    !state.selection.main
  ) {
    return [];
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

  if (matchedProofreadUnderline) {
    const { from, to } = matchedProofreadUnderline;

    // if tooltips exists, and the first tooltip is in range, return tooltips
    if (tooltips.length) {
      const firstTooltip = tooltips[0];
      if (firstTooltip.pos === from && firstTooltip.end === to) {
        return tooltips;
      }
    }

    return [
      {
        pos: from,
        end: to,
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
  return [];
};

export const proofreadTooltips = () => {
  return StateField.define<readonly Tooltip[]>({
    create: (state) => getTooltip([], state),
    update: (tooltips, tr) => getTooltip(tooltips, tr.state),
    provide: (f) => showTooltip.computeN([f], (state) => state.field(f)),
  });
};
