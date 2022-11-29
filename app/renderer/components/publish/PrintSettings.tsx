import { useState } from 'react';
import styled from 'styled-components';
import {
  AdditionalTrimSize,
  InternationalTrimSize,
  LineHeight,
  MassMarketTrimSize,
  PopularTrimSize,
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
  const [
    paragraphFont,
    setParagraphFont,
    fontSize,
    setFontSize,
    lineHeight,
    setLineHeight,
    dropFolio,
    setDropFolio,
    trimSize,
    setTrimSize,
    topMargin,
    setTopMargin,
    bottomMargin,
    setBottomMargin,
    insideMargin,
    setInsideMargin,
    outsideMargin,
    setOutsideMargin,
  ] = useStore((state) => [
    state.paragraphFont,
    state.setParagraphFont,
    state.fontSize,
    state.setFontSize,
    state.lineHeight,
    state.setLineHeight,
    state.dropFolio,
    state.setDropFolio,
    state.trimSize,
    state.setTrimSize,
    state.topMargin,
    state.setTopMargin,
    state.bottomMargin,
    state.setBottomMargin,
    state.insideMargin,
    state.setInsideMargin,
    state.outsideMargin,
    state.setOutsideMargin,
  ]);
  /* TODO replace */
  const paragraphFontOptions = ['Crimson Pro'];
  const fontSizeOptions = ['8', '9', '10', '11', '12', '14', '16'];
  const lineHeightOptions = ['Single', '1.5', 'Double'] as LineHeight[];
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
            setFontSize(Number(value));
          }}
          value={String(fontSize)}
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
        <MarginsContainer>
          <TextField
            name="top"
            label="Top"
            defaultValue={topMargin}
            onBlur={(event) => {
              setTopMargin(event.target.value);
            }}
          />
          <TextField
            name="bottom"
            label="Bottom"
            defaultValue={bottomMargin}
            onBlur={(event) => {
              setTopMargin(event.target.value);
            }}
          />
          <TextField
            name="inside"
            label="Inside"
            defaultValue={insideMargin}
            onBlur={(event) => {
              setInsideMargin(event.target.value);
            }}
          />
          <TextField
            name="outside"
            label="Outside"
            defaultValue={outsideMargin}
            onBlur={(event) => {
              setOutsideMargin(event.target.value);
            }}
          />
        </MarginsContainer>
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
