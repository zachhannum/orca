import { useState } from 'react';
import { SceneBreak } from 'types/types';
import { Setting, SettingLabel } from './Setting';
import { Checkbox, Dropdown } from '../../controls';

const ParagraphSettings = () => {
  /* TODO replace */
  const [sceneBreak, setSceneBreak] = useState<SceneBreak>('⁕');
  const sceneBreakOptions = [
    '⁕',
    '⁂',
    '𐫱',
    '❦',
    '⁕ ⁕ ⁕',
    '• • •',
  ] as SceneBreak[];
  return (
    <>
      <Setting>
        <SettingLabel>Paragraph Break</SettingLabel>
        <div />
      </Setting>
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
