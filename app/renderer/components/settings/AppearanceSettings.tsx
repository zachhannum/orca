import { css } from 'styled-components';
import { TextField, ToggleSwitch } from 'renderer/controls';
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
      </SettingSubSection>
    </ScrollContainer>
  );
};
