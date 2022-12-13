import { DefaultTheme } from 'styled-components';

const sidebarOpacity = window.windowApi.os() === 'darwin' ? 0.5 : 1;

const theme: DefaultTheme = {
  mainBg: 'rgba(41, 41, 46, 1)',
  mainFgText: 'rgba(240, 240, 248, 1)',
  mainFgTextSecondary: 'rgba(207, 207, 222, 1)',
  sidebarBg: `rgba(50, 50, 56, ${sidebarOpacity})`,
  sidebarFgText: 'rgba(240, 240, 248, 0.8)',
  sidebarFgTextSecondary: 'rgba(161, 161, 168, 0.8)',
  dropdownBg: {
    default: 'rgba(70, 70, 79, 1)',
    alt: 'rgba(117, 117, 128, 1)',
  },
  dropdownText: 'rgba(240, 240, 248, 1)',
  dropdownArrow: 'rgba(240, 240, 248, 1)',
  optionSliderFg: {
    default: `rgba(70, 70, 79, 1)`,
    alt:
      window.windowApi.os() === 'darwin'
        ? `rgba(0, 0, 0, 0.4)`
        : 'rgba(78, 78, 87, 1)',
  },
  optionSliderBg: {
    default: 'rgba(50, 50, 56, 1)',
    alt:
      window.windowApi.os() === 'darwin'
        ? `rgba(255, 255, 255, 0.1)`
        : 'rgba(117, 117, 128, 1)',
  },
  optionSliderText: 'rgba(240, 240, 248, 1)',
  buttonPrimaryBg: 'rgba(96, 96, 255, 1)',
  buttonPrimaryText: 'rgba(240, 240, 248, 0.8)',
  previewBg: 'rgba(33, 33, 37, 1)',
  previewDropdownBg: 'rgba(41, 41, 46, 1)',
  previewDropdownText: 'rgba(240, 240, 248, 1)',
  previewArrow: 'rgba(240, 240, 248, 1)',
  checkUnselectedBg: 'rgba(70, 70, 79, 1)',
  checkUnselectedAltBg: 'rgba(117, 117, 128, 1)',
  checkSelectedBg: 'rgba(96, 96, 255, 1)',
  checkFg: 'rgba(240, 240, 248, 1)',
  toggleOffBg: {
    default: 'rgba(70, 70, 79, 1)',
    alt: 'rgba(117, 117, 128, 1)',
  },
  toggleOffFg: {
    default: 'rgba(50, 50, 56, 1)',
    alt: 'rgba(78, 78, 87, 1)',
  },
  toggleOnBg: 'rgba(96, 96, 255, 1)',
  toggleOnFg: 'rgba(240, 240, 248, 1)',
  radioOffBg: 'rgba(70, 70, 79, 1)',
  radioOffAltBg: 'rgba(117, 117, 128, 1)',
  radioOnBg: 'rgba(96, 96, 255, 1)',
  radioOnFg: 'rgba(240, 240, 248, 1)',
  radioText: 'rgba(240, 240, 248, 1)',
  themeSelectBorder: 'rgba(96, 96, 255, 1)',
  textInputBg: {
    default: 'rgba(70, 70, 79, 1)',
    altOne: 'rgba(117, 117, 128, 1)',
    altTwo: 'rgba(142, 142, 155, 0.5)',
  },
  textInputPlaceholderFg: {
    default: 'rgba(50, 50, 56, 1)',
    altOne: 'rgba(78, 78, 87, 1)',
    altTwo: '#8D8D94',
  },
  sidebarIconBg: 'rgba(70, 70, 79, 0.5)',
  sidebarIconFg: 'rgba(132, 132, 136, 0.8)',
  chapterTitleDropdownBg: 'rgba(50, 50, 56, 1)',
  chapterTitleDropdownInset: 'rgba(72, 72, 81, 1)',
  progressBarBg: 'rgba(107, 107, 120, 1)',
  progressBarFg: 'rgba(240, 240, 248, 1)',
  contextMenuBg: 'rgba(50, 50, 56, 1)',
  contextMenuDivider: 'rgba(255, 255, 255, 0.1)',
  contextMenuFg: 'rgba(187, 187, 201, 1)',
  contextMenuExit: 'rgba(255, 85, 74, 1)',
  searchBg: 'rgba(41, 41, 46, 1)',
  searchPlaceholder: 'rgba(132, 132, 136, 1)',
  paperBg: '#f5f2eb',
  modalFgText: '#CFCFDE',
};

export default theme;
