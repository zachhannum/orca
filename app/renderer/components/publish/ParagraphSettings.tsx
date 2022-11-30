import { SceneBreak } from 'types/types';
import useStore from 'renderer/store/useStore';
import { Setting, SettingLabel } from './Setting';
import { Dropdown } from '../../controls';

const ParagraphSettings = () => {
  const [publishSettings, setPublishSettings] = useStore((state) => [
    state.publishSettings,
    state.setPublishSettings,
  ]);
  const sceneBreakOptions = [
    'None',
    '⁕',
    '⁂',
    '𐫱',
    '❦',
    '⁕ ⁕ ⁕',
    '• • •',
  ] as SceneBreak[];
  return (
    <>
      {/* <Setting>
        <SettingLabel>Paragraph Break</SettingLabel>
        <div />
      </Setting> */}
      <Setting>
        <SettingLabel>Scene Break</SettingLabel>
        <Dropdown
          options={sceneBreakOptions}
          onChange={(value) => {
            setPublishSettings({
              ...publishSettings,
              sceneBreak: value as SceneBreak,
            });
          }}
          value={publishSettings.sceneBreak}
        />
      </Setting>
    </>
  );
};

export default ParagraphSettings;
