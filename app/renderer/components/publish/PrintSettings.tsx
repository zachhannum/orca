import { useState } from 'react';
import {
  AdditionalTrimSize,
  InternationalTrimSize,
  LineHeight,
  MassMarketTrimSize,
  PopularTrimSize,
  SceneBreak,
  TrimSize,
} from 'types/types';
import { Setting, SettingLabel } from './Setting';
import { Checkbox, Dropdown } from '../../controls';

const PrintSettings = () => {
  /* TODO replace */
  const [paragraphFont, setParagraphFont] = useState('Crimson Pro');
  const paragraphFontOptions = ['Crimson Pro'];

  const [fontSize, setFontSize] = useState('12');
  const fontSizeOptions = ['8', '9', '10', '11', '12', '14', '16'];

  const [lineHeight, setLineHeight] = useState<LineHeight>('Single');
  const lineHeightOptions = ['Single', '1.5', 'Double'] as LineHeight[];

  const [dropFolio, setDropFolio] = useState(false);

  const [trimSize, setTrimSize] = useState<TrimSize>('5 x 8');
  const popularTrimSizes = [
    '5 x 8',
    '5.25 x 8',
    '5.5 x 8.5',
  ] as PopularTrimSize[];
  const additionalTrimSizes = [
    '5.06 x 7.81',
    '5.5 x 8.25',
    '6.14 x 9.21',
  ] as AdditionalTrimSize[];
  const internationalTrimSizes = [
    '4.72 x 7.48',
    '4.92 x 7.48',
    '5.31 x 8.46',
    '5.83 x 8.27',
  ] as InternationalTrimSize[];
  const massMarketTrimSizes = [
    '4.12 x 6.75',
    '4.25 x 7',
    '4.37 x 7',
  ] as MassMarketTrimSize[];
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
        <Dropdown
          options={paragraphFontOptions}
          onChange={(value) => {
            setParagraphFont(value);
          }}
          value={paragraphFont}
        />
      </Setting>
      <Setting>
        <SettingLabel>Font Size</SettingLabel>
        <Dropdown
          options={fontSizeOptions}
          onChange={(value) => {
            setFontSize(value);
          }}
          value={fontSize}
        />
      </Setting>
      <Setting>
        <SettingLabel>Line Height</SettingLabel>
        <Dropdown
          options={lineHeightOptions}
          onChange={(value) => {
            setLineHeight(value as LineHeight);
          }}
          value={lineHeight}
        />
      </Setting>
      <Setting>
        <SettingLabel>Drop Folio</SettingLabel>
        <Checkbox
          checked={dropFolio}
          onChange={(checked) => {
            setDropFolio(checked);
          }}
        />
      </Setting>
      <Setting>
        <SettingLabel>Margins</SettingLabel>
      </Setting>
      <Setting>
        <SettingLabel>Trim Size</SettingLabel>
        <Dropdown
          value={trimSize}
          onChange={(value) => {
            setTrimSize(value as TrimSize);
          }}
          options={trimSizeOptions}
        />
      </Setting>
    </>
  );
};

export default PrintSettings;
