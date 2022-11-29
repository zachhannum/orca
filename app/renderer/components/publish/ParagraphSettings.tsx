import { SceneBreak } from 'types/types';
import useStore from 'renderer/store/useStore';
import { Setting, SettingLabel } from './Setting';
import { Dropdown } from '../../controls';

const ParagraphSettings = () => {
  const [sceneBreak, setSceneBreak] = useStore((state) => [
    state.sceneBreak,
    state.setSceneBreak,
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
            setSceneBreak(value as SceneBreak);
          }}
          value={sceneBreak}
        />
      </Setting>
    </>
  );
};

export default ParagraphSettings;
