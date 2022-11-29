import { useState } from 'react';
import type { PageHeader } from 'types/types';
import useStore from 'renderer/store/useStore';
import { Setting, SettingLabel, SettingSubHeading } from './Setting';
import { Dropdown } from '../../controls';

const HeadersSettings = () => {
  const [
    rectoPageHeaders,
    setRectoPageHeaders,
    versoPageHeaders,
    setVersoPageHeaders,
  ] = useStore((state) => [
    state.rectoPageHeaders,
    state.setRectoPageHeaders,
    state.versoPageHeaders,
    state.setVersoPageHeaders,
  ]);
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
            setRectoPageHeaders(value as PageHeader);
          }}
          value={rectoPageHeaders}
        />
      </Setting>
      <Setting>
        <SettingLabel>Verso (Even) Page Headers</SettingLabel>
        <Dropdown
          options={pageHeaderOptions}
          onChange={(value) => {
            setVersoPageHeaders(value as PageHeader);
          }}
          value={versoPageHeaders}
        />
      </Setting>
    </>
  );
};

export default HeadersSettings;
