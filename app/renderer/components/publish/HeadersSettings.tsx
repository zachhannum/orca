import { useState } from 'react';
import type { PageHeader } from 'types/types';
import { Setting, SettingLabel, SettingSubHeading } from './Setting';
import { Dropdown } from '../../controls';

const HeadersSettings = () => {
  const [rectoPageHader, setRectoPageHeader] = useState<PageHeader>('None');
  const [versoPageHeader, setVersoPageHeader] = useState<PageHeader>('None');

  const pageHeaderOptions = [
    'None',
    'Chapter Title',
    'Book Title',
    'Author Name',
  ] as PageHeader[];

  return (
    <>
      <Setting>
        <SettingLabel>Recto (Odd) Page Headers</SettingLabel>
        <Dropdown
          options={pageHeaderOptions}
          onChange={(value) => {
            setRectoPageHeader(value as PageHeader);
          }}
          value={rectoPageHader}
        />
      </Setting>
      <Setting>
        <SettingLabel>Verso (Even) Page Headers</SettingLabel>
        <Dropdown
          options={pageHeaderOptions}
          onChange={(value) => {
            setVersoPageHeader(value as PageHeader);
          }}
          value={versoPageHeader}
        />
      </Setting>
    </>
  );
};

export default HeadersSettings;
