import { useRef } from 'react';
import styled, { css } from 'styled-components';
import useStore from 'renderer/store/useStore';
import {
  WritingModeIcon,
  PublishModeIcon,
  CssModeIcon,
  OptionModeIcon,
} from 'renderer/icons';
import { useTheme } from 'renderer/theme/theme';
import { Tooltip } from 'renderer/components';
import { IconButton } from './IconButton';

const AppModeButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 2;
  background-color: ${(p) => p.theme.mainBg};
  border-radius: 9px;
  padding: 3px;
`;

const TooltipContent = styled.div`
  color: ${(p) => p.theme.contextMenuFg};
  padding: 5px;
  font-size: 0.8em;
  text-align: center;
  user-select: none;
  white-space: nowrap;
`;

export const AppModeControls = () => {
  const [appMode, setAppMode, publishSettingsMode, setPublishSettingsMode] =
    useStore((state) => [
      state.appMode,
      state.setAppMode,
      state.publishSettingsMode,
      state.setPublishSettingsMode,
    ]);
  const theme = useTheme();
  const appModeButtonRef = useRef<HTMLAnchorElement | null>(null);
  const publishSettingsModeButtonRef = useRef<HTMLAnchorElement | null>(null);

  return (
    <AppModeButtonContainer>
      {appMode === 'Publish' && (
        <>
          <IconButton
            ref={publishSettingsModeButtonRef}
            iconSize="27px"
            foregroundColor={theme.sidebarIconFg}
            backgroundColor="rgba(255,255,255,0.1)"
            onlyShowBackgroundOnHover
            cssMixin={css`
              padding: 3px;
            `}
            onClick={() => {
              if (publishSettingsMode === 'CSS') {
                setPublishSettingsMode('Options');
              } else {
                setPublishSettingsMode('CSS');
              }
            }}
          >
            {publishSettingsMode === 'CSS' ? (
              <OptionModeIcon />
            ) : (
              <CssModeIcon />
            )}
          </IconButton>
          <Tooltip hoverRef={publishSettingsModeButtonRef}>
            <TooltipContent>
              <div>Current Publish Mode: {publishSettingsMode}</div>
              <div>
                Click to switch to{' '}
                {publishSettingsMode === 'Options' ? 'CSS' : 'Options'} mode{' '}
              </div>
            </TooltipContent>
          </Tooltip>
        </>
      )}
      <IconButton
        ref={appModeButtonRef}
        iconSize="27px"
        foregroundColor={theme.sidebarIconFg}
        backgroundColor="rgba(255,255,255,0.1)"
        onlyShowBackgroundOnHover
        cssMixin={css`
          padding: 3px;
        `}
        onClick={() => {
          if (appMode === 'Publish') {
            setAppMode('Write');
          } else {
            setAppMode('Publish');
          }
        }}
      >
        {appMode === 'Write' ? <PublishModeIcon /> : <WritingModeIcon />}
      </IconButton>
      <Tooltip hoverRef={appModeButtonRef}>
        <TooltipContent>
          <div>Current Mode: {appMode}</div>
          <div>
            Click to switch to {appMode === 'Write' ? 'Publish' : 'Write'} mode
          </div>
        </TooltipContent>
      </Tooltip>
    </AppModeButtonContainer>
  );
};
