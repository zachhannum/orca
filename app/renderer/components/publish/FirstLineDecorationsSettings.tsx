import { useState } from 'react';
import type { LeadIn } from 'types/types';
import useStore from 'renderer/store/useStore';
import { Setting, SettingLabel } from './Setting';
import { ToggleSwitch, Dropdown, TextField } from '../../controls';

const FirstLineDecorationsSettings = () => {
  const LeadInOptions = ['None', 'Small Caps', 'Italics'] as LeadIn[];

  const [publishSettings, setPublishSettings] = useStore((state) => [
    state.publishSettings,
    state.setPublishSettings,
  ]);

  return (
    <>
      <Setting>
        <SettingLabel>Drop Cap</SettingLabel>
        <ToggleSwitch
          onChange={(dropCap) => {
            setPublishSettings({ ...publishSettings, dropCap });
          }}
          value={publishSettings.dropCap}
        />
      </Setting>
      {publishSettings.dropCap && (
        <Setting>
          <SettingLabel>Drop Cap Advanced Settings</SettingLabel>
          <ToggleSwitch
            onChange={(dropCapEnableAdvancedSettings) => {
              setPublishSettings({
                ...publishSettings,
                dropCapEnableAdvancedSettings,
              });
            }}
            value={publishSettings.dropCapEnableAdvancedSettings}
          />
        </Setting>
      )}
      {publishSettings.dropCap &&
        publishSettings.dropCapEnableAdvancedSettings && (
          <>
            <Setting>
              <SettingLabel>Drop Cap Font</SettingLabel>
              <TextField
                name="drop cap font"
                defaultValue={publishSettings.dropCapFont}
                onChangeCallback={(dropCapFont) => {
                  setPublishSettings({ ...publishSettings, dropCapFont });
                }}
              />
            </Setting>
            <Setting>
              <SettingLabel>Drop Cap Line Height</SettingLabel>
              <TextField
                name="drop cap line Height"
                type="number"
                defaultValue={publishSettings.dropCapLineHeight}
                onChangeCallback={(value) => {
                  setPublishSettings({
                    ...publishSettings,
                    dropCapLineHeight: +value,
                  });
                }}
                step="0.1"
                min="0"
                max="5"
              />
            </Setting>
            <Setting>
              <SettingLabel>Drop Cap Bottom Margin</SettingLabel>
              <TextField
                name="drop cap bottom margin"
                type="number"
                defaultValue={publishSettings.dropCapBottomMargin}
                onChangeCallback={(value) => {
                  setPublishSettings({
                    ...publishSettings,
                    dropCapBottomMargin: +value,
                  });
                }}
                step="0.01"
              />
            </Setting>
          </>
        )}
      <Setting>
        <SettingLabel>Lead-in</SettingLabel>
        <Dropdown
          options={LeadInOptions as string[]}
          onChange={(leadIn) => {
            setPublishSettings({
              ...publishSettings,
              leadIn: leadIn as LeadIn,
            });
          }}
          value={publishSettings.leadIn}
        />
      </Setting>
    </>
  );
};

export default FirstLineDecorationsSettings;
