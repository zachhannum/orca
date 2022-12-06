import { useState } from 'react';
import styled, { css } from 'styled-components';
import { Dropdown, TextField, ToggleSwitch } from 'renderer/controls';
import useStore from 'renderer/store/useStore';
import { EndpointOption, endpointOptions } from 'types/types';
import ScrollContainer from '../ScrollContainer';
import {
  Setting,
  SettingLabel,
  SettingSubSection,
  SettingSectionHeading,
} from '..';

const scrollerCss = css`
  margin-right: 5px;
  margin-bottom: 10px;
  width: 100%;
`;

const StackedSettingsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
`;

export const EditorSettings = () => {
  const [settings, setSettings] = useStore((state) => [
    state.settings,
    state.setSettings,
  ]);
  const [useCustomEndpoint, setUseCustomEndpoint] = useState(false);
  return (
    <ScrollContainer cssMixin={scrollerCss}>
      <SettingSubSection>
        <SettingSectionHeading>LanguageTool</SettingSectionHeading>
        <Setting>
          <SettingLabel>Enable LanguageTool Integration</SettingLabel>
          <ToggleSwitch
            onChange={(value) => {
              setSettings({
                ...settings,
                enableLanguageToolIntegration: value,
              });
            }}
            value={settings.enableLanguageToolIntegration}
          />
        </Setting>
        <Setting>
          <SettingLabel disabled={!settings.enableLanguageToolIntegration}>
            Endpoint
          </SettingLabel>
          <StackedSettingsDiv>
            <Dropdown
              options={endpointOptions}
              disabled={!settings.enableLanguageToolIntegration}
              onChange={(value) => {
                let url = `https://${value}`;
                const useCustomEndpoint = value === 'Custom';
                if (useCustomEndpoint) {
                  url = '';
                }
                setSettings({
                  ...settings,
                  languageToolEndpoint: value as EndpointOption,
                  languageToolEndpointUrl: url,
                });
                setUseCustomEndpoint(useCustomEndpoint);
              }}
              value={settings.languageToolEndpoint}
            />
            <TextField
              fullWidth
              name="languagetool endpoint"
              onChangeCallback={(value) => {
                setSettings({ ...settings, languageToolEndpointUrl: value });
              }}
              disabled={
                !settings.enableLanguageToolIntegration || !useCustomEndpoint
              }
              value={settings.languageToolEndpointUrl}
            />
          </StackedSettingsDiv>
        </Setting>
        <Setting>
          <SettingLabel disabled={!settings.enableLanguageToolIntegration}>
            Username
          </SettingLabel>
          <TextField
            name="languagetool username"
            onChangeCallback={(value) => {
              setSettings({ ...settings, languageToolUsername: value });
            }}
            disabled={!settings.enableLanguageToolIntegration}
            defaultValue={settings.languageToolUsername}
            width={225}
          />
        </Setting>
        <Setting>
          <SettingLabel disabled={!settings.enableLanguageToolIntegration}>
            API Key
          </SettingLabel>
          <TextField
            name="languagetool api key"
            onChangeCallback={(value) => {
              setSettings({ ...settings, languageToolApiKey: value });
            }}
            disabled={!settings.enableLanguageToolIntegration}
            defaultValue={settings.languageToolApiKey}
            type="password"
            width={225}
          />
        </Setting>
      </SettingSubSection>
    </ScrollContainer>
  );
};
