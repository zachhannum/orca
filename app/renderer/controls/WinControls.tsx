import styled, { useTheme } from 'styled-components';
import { useIsWindowMaxized } from '../hooks';
import IconButton from './IconButton';
import {
  WinCloseIcon,
  WinMaximizeIcon,
  WinMinimizeIcon,
  WinRestoreIcon,
} from '../icons';

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
  const buttonConfig = {
    iconSize: '12px',
    height: '25px',
    width: '40px',
    roundCorners: false,
    backgroundColor: '#00000026',
    onlyShowBackgroundOnHover: true,
    foregroundColor: theme.mainFgTextSecondary,
  };
  const iconConfig = {
    shapeRendering: 'crispEdges',
  };
  return (
    <StyledWinControls>
      <IconButton {...buttonConfig} onClick={window.windowApi.minimize}>
        <WinMinimizeIcon {...iconConfig} />
      </IconButton>
      <IconButton {...buttonConfig} onClick={window.windowApi.toggleMaximized}>
        {maximized ? (
          <WinRestoreIcon {...iconConfig} />
        ) : (
          <WinMaximizeIcon {...iconConfig} />
        )}
      </IconButton>
      <IconButton
        {...buttonConfig}
        backgroundColor={theme.contextMenuExit}
        onClick={window.windowApi.closeWindow}
      >
        <WinCloseIcon {...iconConfig} />
      </IconButton>
    </StyledWinControls>
  );
};

export default WinControls;
