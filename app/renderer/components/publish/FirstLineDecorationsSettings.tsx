import type { LeadIn } from 'types/types';
import useStore from 'renderer/store/useStore';
import { Setting, SettingLabel } from './Setting';
import { ToggleSwitch, Dropdown } from '../../controls';

const FirstLineDecorationsSettings = () => {
  const LeadInOptions = ['None', 'Small Caps', 'Italics'] as LeadIn[];

  const [dropCap, setDropCap, leadIn, setLeadIn] = useStore((state) => [
    state.dropCap,
    state.setDropCap,
    state.leadIn,
    state.setLeadIn,
  ]);

  return (
    <>
      <Setting>
        <SettingLabel>Drop Cap</SettingLabel>
        <ToggleSwitch onChange={setDropCap} value={dropCap} />
      </Setting>
      <Setting>
        <SettingLabel>Lead-in</SettingLabel>
        <Dropdown
          options={LeadInOptions as string[]}
          onChange={(option) => {
            setLeadIn(option as LeadIn);
          }}
          value={leadIn}
        />
      </Setting>
    </>
  );
};

export default FirstLineDecorationsSettings;
