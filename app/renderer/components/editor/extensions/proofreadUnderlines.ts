import { StateEffect, StateField } from '@codemirror/state';
import { Decoration, DecorationSet, EditorView } from '@codemirror/view';
import { MatchesEntity } from '../language-tool/api';
import { getCategoryClassName } from '../language-tool/utils';

export type ProofreadUnderlineEffect = {
  from: number;
  to: number;
  match: MatchesEntity;
};

export const addProofreadUnderline =
  StateEffect.define<ProofreadUnderlineEffect>();

const filterUnderlines = (
  decorationStart: number,
  decorationEnd: number,
  rangeStart: number,
  rangeEnd: number
) => {
  // Decoration begins in defined range
  if (decorationStart >= rangeStart && decorationStart <= rangeEnd) {
    return false;
  }

  // Decoration ends in defined range
  if (decorationEnd >= rangeStart && decorationEnd <= rangeEnd) {
    return false;
  }

  // Defined range begins within decoration
  if (rangeStart >= decorationStart && rangeStart <= decorationEnd) {
    return false;
  }

  // Defined range ends within decoration
  if (rangeEnd >= decorationStart && rangeEnd <= decorationEnd) {
    return false;
  }

  return true;
};

export const proofreadUnderlineField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none;
  },
  update(underlines, tr) {
    underlines = underlines.map(tr.changes);

    // Clear out any decorations when their contents are edited
    if (tr.docChanged && tr.selection && underlines.size) {
      underlines = underlines.update({
        filter: (from, to) => {
          return filterUnderlines(
            from,
            to,
            tr.selection!.main.from,
            tr.selection!.main.to
          );
        },
      });
    }

    for (const e of tr.effects) {
      if (e.is(addProofreadUnderline)) {
        const { from, to, match } = e.value as ProofreadUnderlineEffect;

        underlines = underlines.update({
          add: [
            Decoration.mark({
              class: `lt-underline ${getCategoryClassName(
                match.rule.category.id
              )}`,
              match,
            }).range(from, to),
          ],
        });
      }
    }

    return underlines;
  },
  provide: (f) => EditorView.decorations.from(f),
});
