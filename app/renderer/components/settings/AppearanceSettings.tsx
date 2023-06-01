import { css } from 'styled-components';
import { TextField, Slider } from 'renderer/controls';
import useStore from 'renderer/store/useStore';
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

export const AppearanceSettings = () => {
  const [settings, setSettings] = useStore((state) => [
    state.settings,
    state.setSettings,
  ]);

  return (
    <ScrollContainer cssMixin={scrollerCss}>
      <SettingSubSection>
        <SettingSectionHeading>Font</SettingSectionHeading>
        <Setting>
          <SettingLabel>Interface Font</SettingLabel>
          <TextField
            name="interface font"
            placeholder="System Font"
            defaultValue={settings.interfaceFont}
            onChangeCallback={(value) => {
              setSettings({
                ...settings,
                interfaceFont: value,
              });
            }}
          />
        </Setting>
        <Setting>
          <SettingLabel>Interface Font Size</SettingLabel>
          <Slider
            defaultValue={settings.interfaceFontSize}
            min={8}
            max={24}
            onChange={(value) => {
              setSettings({ ...settings, interfaceFontSize: value });
            }}
          />
        </Setting>
        <Setting>
          <SettingLabel>Editor Font</SettingLabel>
          <TextField
            name="editor font"
            placeholder="System Font"
            defaultValue={settings.editorFont}
            onChangeCallback={(value) => {
              setSettings({
                ...settings,
                editorFont: value,
              });
            }}
          />
        </Setting>
        <Setting>
          <SettingLabel>Editor Monospace Font</SettingLabel>
          <TextField
            name="editor monospace font"
            placeholder="System Mono Font"
            defaultValue={settings.editorMonoFont}
            onChangeCallback={(value) => {
              setSettings({
                ...settings,
                editorMonoFont: value,
              });
            }}
          />
        </Setting>
        <Setting>
          <SettingLabel>Editor Font Size</SettingLabel>
          <Slider
            defaultValue={settings.editorFontSize}
            min={8}
            max={24}
            onChange={(value) => {
              setSettings({ ...settings, editorFontSize: value });
            }}
          />
        </Setting>
        <Setting>
          <SettingLabel>CSS Editor Font Size</SettingLabel>
          <Slider
            defaultValue={settings.cssEditorFontSize}
            min={8}
            max={24}
            onChange={(value) => {
              setSettings({ ...settings, cssEditorFontSize: value });
            }}
          />
        </Setting>
      </SettingSubSection>
    </ScrollContainer>
  );
};
