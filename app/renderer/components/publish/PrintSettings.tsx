import styled from 'styled-components';
import {
  additionalTrimSizes,
  internationalTrimSizes,
  LineHeight,
  massMarketTrimSizes,
  popularTrimSizes,
  TrimSize,
} from 'types/types';
import useStore from 'renderer/store/useStore';
import { Setting, SettingLabel } from './Setting';
import { Checkbox, Dropdown, TextField } from '../../controls';

const MarginsContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const PrintSettings = () => {
  const [publishSettings, setPublishSettings] = useStore((state) => [
    state.publishSettings,
    state.setPublishSettings,
  ]);

  const fontSizeOptions = ['8', '9', '10', '11', '12', '14', '16'];
  const lineHeightOptions = ['Single', '1.5', 'Double'] as LineHeight[];

  const trimSizeOptions = [
    { name: 'Popular Trim Sizes', options: popularTrimSizes },
    { name: 'Additional Trim Sizes', options: additionalTrimSizes },
    { name: 'International Trim Sizes', options: internationalTrimSizes },
    { name: 'Mass Market Trim Sizes', options: massMarketTrimSizes },
  ];

  return (
    <>
      <Setting>
        <SettingLabel>Paragraph Font</SettingLabel>
        <TextField
          name="font"
          defaultValue={publishSettings.paragraphFont}
          onChangeCallback={(paragraphFont) => {
            setPublishSettings({ ...publishSettings, paragraphFont });
          }}
        />
        {/* <Dropdown
          options={paragraphFontOptions}
          onChange={(value) => {
            setParagraphFont(value);
          }}
          value={paragraphFont}
        /> */}
      </Setting>
      <Setting>
        <SettingLabel>Font Size</SettingLabel>
        <Dropdown
          options={fontSizeOptions}
          onChange={(value) => {
            setPublishSettings({ ...publishSettings, fontSize: Number(value) });
          }}
          value={String(publishSettings.fontSize)}
        />
      </Setting>
      <Setting>
        <SettingLabel>Line Height</SettingLabel>
        <Dropdown
          options={lineHeightOptions}
          onChange={(value) => {
            setPublishSettings({
              ...publishSettings,
              lineHeight: value as LineHeight,
            });
          }}
          value={publishSettings.lineHeight}
        />
      </Setting>
      <Setting>
        <SettingLabel>Drop Folio</SettingLabel>
        <Checkbox
          checked={publishSettings.dropFolio}
          onChange={(dropFolio) => {
            setPublishSettings({ ...publishSettings, dropFolio });
          }}
        />
      </Setting>
      <Setting>
        <SettingLabel>Margins</SettingLabel>
        <MarginsContainer>
          <TextField
            name="top"
            label="Top"
            defaultValue={publishSettings.topMargin}
            onChangeCallback={(topMargin) => {
              setPublishSettings({ ...publishSettings, topMargin: +topMargin });
            }}
          />
          <TextField
            name="bottom"
            label="Bottom"
            defaultValue={publishSettings.bottomMargin}
            onChangeCallback={(bottomMargin) => {
              setPublishSettings({
                ...publishSettings,
                bottomMargin: +bottomMargin,
              });
            }}
          />
          <TextField
            name="inside"
            label="Inside"
            defaultValue={publishSettings.insideMargin}
            onChangeCallback={(insideMargin) => {
              setPublishSettings({
                ...publishSettings,
                insideMargin: +insideMargin,
              });
            }}
          />
          <TextField
            name="outside"
            label="Outside"
            defaultValue={publishSettings.outsideMargin}
            onChangeCallback={(outsideMargin) => {
              setPublishSettings({
                ...publishSettings,
                outsideMargin: +outsideMargin,
              });
            }}
          />
        </MarginsContainer>
      </Setting>
      <Setting>
        <SettingLabel>Trim Size</SettingLabel>
        <Dropdown
          value={publishSettings.trimSize}
          onChange={(value) => {
            setPublishSettings({
              ...publishSettings,
              trimSize: value as TrimSize,
            });
          }}
          options={trimSizeOptions}
        />
      </Setting>
    </>
  );
};

export default PrintSettings;
