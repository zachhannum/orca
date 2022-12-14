import { RefObject, useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useIsWindowMaxized, useIsHovering } from '../hooks';
import IconButton from './IconButton';
import {
  WinCloseIcon,
  WinMaximizeIcon,
  WinMinimizeIcon,
  WinRestoreIcon,
} from '../icons';
import { ContextMenu, TooltipText } from '../components';
import { getContextMenuPosition } from '../utils/menuUtils';

const StyledWinControls = styled.div`
  display: flex;
  z-index: 1000;
  flex-direction: row;
  flex-wrap: nowrap;
  position: absolute;
  top: 0;
  right: 0;
  -webkit-app-region: no-drag;
`;

const WinControls = () => {
  const theme = useTheme();
  const maximized = useIsWindowMaxized();
  const minimizeButtonRef = useRef<HTMLAnchorElement | null>(null);
  const isHoveringMinimize = useIsHovering(minimizeButtonRef);
  const maximizeButtonRef = useRef<HTMLAnchorElement | null>(null);
  const isHoveringMaximize = useIsHovering(maximizeButtonRef);
  const closeButtonRef = useRef<HTMLAnchorElement | null>(null);
  const isHoveringClose = useIsHovering(closeButtonRef);
  const [tooltipText, setTooltipText] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const calculateAndSetTooltipPosition = (ref: RefObject<HTMLAnchorElement | null>) => {
    if (ref.current) {
      const { x, y } = getContextMenuPosition(
        ref.current,
        'center',
        'bottom'
      );
      setTooltipPosition({ x, y: y + 5 });
    }
  }

  useEffect(() => {
    if (isHoveringMinimize) {
      setTooltipText('Minimize');
      calculateAndSetTooltipPosition(minimizeButtonRef);
    }
    if (isHoveringMaximize) {
      setTooltipText(maximized ? 'Restore Down' : 'Maximize');
      calculateAndSetTooltipPosition(maximizeButtonRef);
    }
    if (isHoveringClose) {
      setTooltipText('Close Window');
      calculateAndSetTooltipPosition(closeButtonRef);
    }
    setShowTooltip(isHoveringMinimize || isHoveringMaximize || isHoveringClose);
  }, [isHoveringMinimize, isHoveringMaximize, isHoveringClose]);

  const buttonConfig = {
    iconSize: '8px',
    height: '25px',
    width: '40px',
    roundCorners: false,
    onlyShowBackgroundOnHover: true,
    foregroundColor: theme.mainFgTextSecondary,
  };
  const iconConfig = {
    // shapeRendering: 'crispEdges',
  };
  return (
    <StyledWinControls>
      <IconButton
        {...buttonConfig}
        onClick={window.windowApi.minimize}
        ref={minimizeButtonRef}
      >
        <WinMinimizeIcon {...iconConfig} />
      </IconButton>
      <IconButton
        {...buttonConfig}
        onClick={window.windowApi.toggleMaximized}
        ref={maximizeButtonRef}
      >
        {maximized ? (
          <WinRestoreIcon {...iconConfig} />
        ) : (
          <WinMaximizeIcon {...iconConfig} />
        )}
      </IconButton>
      <IconButton
        {...buttonConfig}
        onClick={window.windowApi.closeWindow}
        ref={closeButtonRef}
      >
        <WinCloseIcon {...iconConfig} />
      </IconButton>
      <ContextMenu
        showMenu={showTooltip}
        position={tooltipPosition}
        onCloseMenu={() => {
          setShowTooltip(false);
        }}
        center
      >
        <TooltipText>{tooltipText}</TooltipText>
      </ContextMenu>
    </StyledWinControls>
  );
};

export default WinControls;
