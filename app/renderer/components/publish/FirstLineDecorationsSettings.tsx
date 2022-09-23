import { useState } from 'react';
import type { LeadIn } from 'types/types';
import { Setting, SettingLabel } from './Setting';
import { ToggleSwitch, Dropdown } from '../../controls';

const FirstLineDecorationsSettings = () => {
  const LeadInOptions = ['None', 'Small Caps', 'Italics'] as LeadIn[];

  /* TODO replace with store option */
  const [leadIn, setLeadIn] = useState<LeadIn>('None');

  return (
    <>
      <Setting>
        <SettingLabel>Drop Cap</SettingLabel>
        <ToggleSwitch />
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
