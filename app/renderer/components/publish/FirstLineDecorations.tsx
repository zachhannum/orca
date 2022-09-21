import { Setting, SettingLabel } from './Setting';
import { ToggleSwitch, Dropdown } from '../../controls';

const FirstLineDecorations = () => {
  return (
    <>
      <Setting>
        <SettingLabel>Drop Cap</SettingLabel>
        <ToggleSwitch />
      </Setting>
      <Setting>
        <SettingLabel>Lead-in</SettingLabel>
        <Dropdown />
      </Setting>
    </>
  );
};

export default FirstLineDecorations;
