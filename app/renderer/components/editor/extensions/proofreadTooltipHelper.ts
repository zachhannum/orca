import { Extension } from '@codemirror/state';
import { ViewUpdate, EditorView } from '@codemirror/view';
import { proofreadUnderlineField } from '.';
import { MatchesEntity } from '../language-tool/api';
import { ProofreadUnderlineEffect } from './proofreadUnderlines';

export type TooltipLocation = {
  from: number;
  to: number;
  top: number;
  left: number;
  match: MatchesEntity;
};

export const proofreadTooltipHelper = (
  onTooltipUpdate: (tooltip: TooltipLocation | null) => void
): Extension => {
  return EditorView.updateListener.of((update: ViewUpdate) => {
    if (!update.state.selection.main.empty) {
      onTooltipUpdate(null);
      return;
    }

    const underlines = update.state.field(proofreadUnderlineField);

    let matchedProofreadUnderline: ProofreadUnderlineEffect | null = null;
    underlines.between(
      update.state.selection.main.from,
      update.state.selection.main.to,
      (from, to, value) => {
        matchedProofreadUnderline = {
          from,
          to,
          match: value.spec.match,
        };
      }
    );

    if (matchedProofreadUnderline !== null) {
      const { from, to, match } = matchedProofreadUnderline;
      const rect = update.view.coordsAtPos(from);
      if (rect) {
        const { top, left } = rect;
        onTooltipUpdate({
          from,
          to,
          top,
          left,
          match,
        });
      }
    } else {
      onTooltipUpdate(null);
    }
  });
};
