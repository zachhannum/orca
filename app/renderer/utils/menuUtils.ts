import type { Position } from '../components/ContextMenu';

export type HorizontalPosition = 'left' | 'right' | 'center';
export type VerticalPosition = 'top' | 'bottom' | 'center';

export const getContextMenuPosition = (
  ref: HTMLElement,
  horizontalPosition: HorizontalPosition,
  verticalPosition: VerticalPosition
): Position => {
  let x = 0;
  let y = 0;
  const rect = ref.getBoundingClientRect();
  switch (horizontalPosition) {
    case 'left':
      x = rect.left;
      break;
    case 'center':
      x = rect.left + rect.width / 2;
      break;
    case 'right':
      x = rect.right;
  }
  switch (verticalPosition) {
    case 'top':
      y = rect.top;
      break;
    case 'center':
      y = rect.top + rect.height / 2;
      break;
    case 'bottom':
      y = rect.bottom;
      break;
  }
  return {
    x,
    y,
  };
};
