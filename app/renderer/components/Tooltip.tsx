import { useState, RefObject, useEffect } from 'react';
import { useIsHovering } from 'renderer/hooks';
import { getContextMenuPosition } from 'renderer/utils/menuUtils';
import ContextMenu from './ContextMenu';

type TooltipProps = {
  children: React.ReactNode;
  hoverRef: RefObject<HTMLElement | null>;
};

export const Tooltip = ({ children, hoverRef }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({
    x: 0,
    y: 0,
  });

  const isHovering = useIsHovering(hoverRef);

  const calculateAndSetTooltipPosition = (
    ref: RefObject<HTMLElement | null>
  ) => {
    if (ref.current) {
      const { x, y } = getContextMenuPosition(ref.current, 'center', 'bottom');
      setTooltipPosition({ x, y: y + 5 });
    }
  };

  // recalculate tooltip position when children change
  useEffect(() => {
    if (isHovering) {
      calculateAndSetTooltipPosition(hoverRef);
    }
  }, [children]);

  useEffect(() => {
    if (isHovering) {
      calculateAndSetTooltipPosition(hoverRef);
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  }, [isHovering]);

  return (
    <ContextMenu
      showMenu={showTooltip}
      position={tooltipPosition}
      onCloseMenu={() => {}}
      center
    >
      {children}
    </ContextMenu>
  );
};
