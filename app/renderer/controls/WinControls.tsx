import styled, { useTheme } from 'styled-components';
import IconButton from './IconButton';
import { WinCloseIcon, WinMaximizeIcon, WinMinimizeIcon } from '../icons';

const StyledWinControls = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  position: absolute;
  top: 0;
  right: 0;
  -webkit-app-region: no-drag;
`;

const WinControls = () => {
  const theme = useTheme();
  const buttonConfig = {
    iconSize: '10px',
    height: '20px',
    width: '30px',
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
      <IconButton {...buttonConfig} onClick={window.calamusApi.minimize}>
        <WinMinimizeIcon {...iconConfig} />
      </IconButton>
      <IconButton {...buttonConfig} onClick={window.calamusApi.toggleMaximized}>
        <WinMaximizeIcon {...iconConfig} />
      </IconButton>
      <IconButton
        {...buttonConfig}
        backgroundColor={theme.contextMenuExit}
        onClick={window.calamusApi.closeWindow}
      >
        <WinCloseIcon {...iconConfig} />
      </IconButton>
    </StyledWinControls>
  );
};

export default WinControls;
