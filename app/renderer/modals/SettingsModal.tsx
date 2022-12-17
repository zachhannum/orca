import { useState } from 'react';
import styled, { css } from 'styled-components';
import Color from 'color';
import {
  EditorSettings,
  AppearanceSettings,
} from 'renderer/components/settings';
import Modal from './Modal';
import type { ModalProps } from './Modal';

const StyledModalContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 80vh;
  width: 85vw;
`;

const StyledSidebarDiv = styled.div`
  background-color: ${(p) => Color(p.theme.sidebarBg).alpha(1.0).toString()};
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px 0px 0px 10px;
  padding: 20px;
`;

const SettingsFrame = styled.div`
  height: 100%;
  flex-grow: 1;
  padding: 30px 7px 7px 7px;
`;

const StyledSettingsDiv = styled.div`
  height: 100%;
  display: flex;
  padding: 10px 60px;
  border-radius: 7px;
  background-color: ${(p) => p.theme.mainBg};
`;

const StyledSettingsSectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  gap: 5px;
`;

const StyledSettingsSectionHeader = styled.div`
  color: ${(p) => p.theme.sidebarFgTextSecondary};
  padding: 10px 5px;
  font-size: 0.9em;
`;

type StyledSettingsSectionProps = {
  selected: boolean;
};
const StyledSettingsSection = styled.div<StyledSettingsSectionProps>`
  color: ${(p) => p.theme.sidebarFgText};
  &:hover {
    background-color: ${(p) =>
      Color(p.theme.sidebarBg).alpha(1.0).lighten(0.2).toString()};
  }
  ${(p) =>
    p.selected &&
    css`
      background-color: ${(p) => p.theme.buttonPrimaryBg};
      &:hover {
        background-color: ${(p) => p.theme.buttonPrimaryBg};
      }
    `}

  border-radius: 5px;
  cursor: pointer;
  padding: 5px 15px;
  width: 100%;
  transition: background-color 100ms ease-in-out;
`;
export const settingsSections = [
  'Editor',
  'Appearance',
  'Hotkeys',
  'About',
] as const;
export type SettingsSection = typeof settingsSections[number];

type SettingsContentProps = {
  settingsSection: SettingsSection;
};
const SettingsContent = ({ settingsSection }: SettingsContentProps) => {
  switch (settingsSection) {
    case 'Editor':
      return <EditorSettings />;
    case 'Appearance':
      return <AppearanceSettings />;
    case 'Hotkeys':
      return <div />;
    case 'About':
      return <div />;
    default:
      return (
        <div>Error, ${settingsSection} is not a valid setting section.</div>
      );
  }
};

export const SettingsModal = (props: ModalProps) => {
  const [selectedSection, setSelectedSection] =
    useState<SettingsSection>('Editor');
  return (
    <Modal {...props}>
      <StyledModalContent>
        <StyledSidebarDiv>
          <StyledSettingsSectionDiv>
            <StyledSettingsSectionHeader>Settings</StyledSettingsSectionHeader>
            {settingsSections.map((sectionName) => (
              <StyledSettingsSection
                id={sectionName}
                key={sectionName}
                selected={selectedSection === sectionName}
                onClick={() => {
                  setSelectedSection(sectionName);
                }}
              >
                {sectionName}
              </StyledSettingsSection>
            ))}
          </StyledSettingsSectionDiv>
        </StyledSidebarDiv>
        <SettingsFrame>
          <StyledSettingsDiv>
            <SettingsContent settingsSection={selectedSection} />
          </StyledSettingsDiv>
        </SettingsFrame>
      </StyledModalContent>
    </Modal>
  );
};
