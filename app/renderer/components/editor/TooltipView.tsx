import { EditorView } from '@codemirror/view';
import { useEffect, useRef, useState } from 'react';
import { useResizeObserver } from 'renderer/hooks';
import styled from 'styled-components';
import { TooltipLocation } from './extensions/proofreadTooltipHelper';
import { clearUnderlinesInRange } from './extensions/proofreadUnderlines';

type TooltipViewProps = {
  tooltip: TooltipLocation | null;
  editorView: EditorView | null;
  viewRef: React.RefObject<HTMLDivElement>;
};

const transitionAnimationDuration = 100;

const Tooltip = styled.div`
  background-color: ${(p) => p.theme.contextMenuBg};
  border: 1px solid ${(p) => p.theme.contextMenuDivider};
  border-radius: 10px;
  padding: 5px;
  position: absolute;
  z-index: 2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: 'flex';
  flex-direction: 'column';
  max-width: 200px;
  transition-property: opacity, transform, visibility;
  transition-duration: ${transitionAnimationDuration}ms;
  transition-timing-function: ease-out;
  opacity: 0;
  transform: scale(0.8);
  transform-origin: bottom;
`;

const TooltipTitle = styled.div`
  color: ${(p) => p.theme.contextMenuFg};
  font-size: 1em;
  font-weight: bold;
  padding: 7px;
  white-space: nowrap;
`;

const TooltipMessage = styled.div`
  color: ${(p) => p.theme.contextMenuFg};
  font-size: 0.9em;
  padding: 7px;
`;

const TooltipSuggestion = styled.div`
  color: ${(p) => p.theme.buttonPrimaryBg};
  padding: 7px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  border-radius: 7px;
  cursor: pointer;
`;

const tooltipPadding = 5;

export const TooltipView = ({
  tooltip,
  editorView,
  viewRef,
}: TooltipViewProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [tooltipLoc, setTooltipLoc] = useState<TooltipLocation | null>(null);

  const calculateTooltipPos = (): { top: number; left: number } => {
    if (tooltipRef.current && tooltipRef.current.parentElement && editorView) {
      if (tooltipLoc) {
        let tooltipTop = tooltipLoc.top;
        let tooltipLeft = tooltipLoc.left;
        // Update tooltip position if we can just in case it has changed
        if (editorView) {
          const newCoords = editorView.coordsAtPos(tooltipLoc.from);
          if (newCoords) {
            tooltipTop = newCoords.top;
            tooltipLeft = newCoords.left;
          }
        }

        const scaleFactor =
          tooltipRef.current.style.transform === 'scale(1)' ? 1 : 0.8;

        const tooltipParentRect =
          tooltipRef.current.parentElement.getBoundingClientRect();

        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const scaleTooltipHeight = tooltipRect.height / scaleFactor;

        let top =
          tooltipTop -
          tooltipParentRect.top -
          scaleTooltipHeight -
          tooltipPadding;

        tooltipRef.current.style.transformOrigin = 'bottom';

        const leftAdjust = Math.min(
          0,
          tooltipParentRect.right - (tooltipLeft + tooltipRect.width)
        );

        if (top + tooltipParentRect.top < 40) {
          tooltipRef.current.style.transformOrigin = 'top';
          top +=
            scaleTooltipHeight +
            tooltipPadding * 2 +
            editorView.defaultLineHeight;
        }

        const left =
          tooltipLeft -
          tooltipRef.current.parentElement.getBoundingClientRect().left +
          leftAdjust;

        return { top, left };
      }
    }
    return { top: 0, left: 0 };
  };

  const getTooltipPos = (): { top: number; left: number } => {
    if (tooltipRef.current) {
      return {
        top: parseFloat(tooltipRef.current.style.top),
        left: parseFloat(tooltipRef.current.style.left),
      };
    }
    return { top: 0, left: 0 };
  };

  const updateTooltipPos = () => {
    const { top, left } = calculateTooltipPos();
    if (tooltipRef.current) {
      tooltipRef.current.style.top = `${top}px`;
      tooltipRef.current.style.left = `${left}px`;
    }
  };

  const updateTooltipContent = (tooltip: TooltipLocation) => {
    setTitle(tooltip.match.shortMessage);
    setMessage(tooltip.match.message);
    if (tooltip.match.replacements) {
      setSuggestions(
        tooltip.match.replacements.slice(0, 3).map((r) => r.value)
      );
    } else {
      setSuggestions([]);
    }
  };

  const hideTooltip = () => {
    if (tooltipRef.current) {
      tooltipRef.current.style.visibility = 'hidden';
      tooltipRef.current.style.opacity = '0';
      tooltipRef.current.style.transform = 'scale(0.8)';
      setTimeout(() => {
        if (tooltipRef.current) {
          tooltipRef.current.style.top = '0';
          tooltipRef.current.style.left = '0';
        }
      }, transitionAnimationDuration);
    }
  };

  const showTooltip = () => {
    if (tooltipRef.current) {
      tooltipRef.current.style.visibility = 'visible';
      setTimeout(() => {
        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = '1';
          tooltipRef.current.style.transform = 'scale(1)';
        }
      }, transitionAnimationDuration);
    }
  };

  useResizeObserver(viewRef, 100, updateTooltipPos);

  useEffect(() => {
    // don't update if tooltip and tooltipLoc exist and have the same from value
    if (tooltip && tooltipLoc && tooltip.from === tooltipLoc.from) {
      return;
    }

    if (tooltip && tooltip !== tooltipLoc) {
      // if tooltipLoc exists, hide the tooltip and update the content after the transition animation
      if (tooltipLoc) {
        hideTooltip();
        setTimeout(() => {
          updateTooltipContent(tooltip);
          setTooltipLoc(tooltip);
        }, transitionAnimationDuration);
        return;
      }

      updateTooltipContent(tooltip);
    } else if (!tooltip && tooltipRef.current) {
      hideTooltip();
    }
    setTooltipLoc(tooltip);
  }, [tooltip]);

  useEffect(() => {
    if (tooltipRef.current && tooltipRef.current.parentElement) {
      if (tooltipLoc) {
        updateTooltipPos();
        showTooltip();
      }
    }
  }, [tooltipLoc]);

  const handleScroll = () => {
    if (tooltipRef.current && tooltipRef.current.parentElement && editorView) {
      if (tooltipLoc) {
        const { top: newTop, left: newLeft } = calculateTooltipPos();
        const { top: currTop, left: currLeft } = getTooltipPos();
        if (
          Math.abs(newTop - currTop) > 75 ||
          Math.abs(newLeft - currLeft) > 75
        ) {
          hideTooltip();
          setTimeout(() => {
            updateTooltipPos();
            showTooltip();
          }, transitionAnimationDuration);
        }
      }
    }
  };

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (viewRef.current) {
        viewRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [tooltipLoc]);

  return (
    <Tooltip ref={tooltipRef}>
      {title.length > 0 && <TooltipTitle>{title}</TooltipTitle>}
      <TooltipMessage>{message}</TooltipMessage>
      {suggestions.map((suggestion) => (
        <TooltipSuggestion
          key={suggestion}
          onClick={() => {
            if (editorView && tooltip) {
              const clearUnderlineEffect = clearUnderlinesInRange.of({
                from: tooltip.from,
                to: tooltip.to,
              });
              editorView.dispatch({
                changes: {
                  from: tooltip.from,
                  to: tooltip.to,
                  insert: suggestion,
                },
                effects: [clearUnderlineEffect],
              });
              editorView.focus();
            }
          }}
        >
          {suggestion}
        </TooltipSuggestion>
      ))}
    </Tooltip>
  );
};
