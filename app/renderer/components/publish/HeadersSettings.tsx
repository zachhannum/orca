import type { PageHeader } from 'types/types';
import useStore from 'renderer/store/useStore';
import { Setting, SettingLabel } from '..';
import { Dropdown } from '../../controls';

const HeadersSettings = () => {
  const [publishSettings, setPublishSettings] = useStore((state) => [
    state.publishSettings,
    state.setPublishSettings,
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
            setPublishSettings({
              ...publishSettings,
              rectoPageHeaders: value as PageHeader,
            });
          }}
          value={publishSettings.rectoPageHeaders}
        />
      </Setting>
      <Setting>
        <SettingLabel>Verso (Even) Page Headers</SettingLabel>
        <Dropdown
          options={pageHeaderOptions}
          onChange={(value) => {
            setPublishSettings({
              ...publishSettings,
              versoPageHeaders: value as PageHeader,
            });
          }}
          value={publishSettings.versoPageHeaders}
        />
      </Setting>
    </>
  );
};

export default HeadersSettings;
