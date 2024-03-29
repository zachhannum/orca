import { useState, useEffect } from 'react';
import useStore from 'renderer/store/useStore';
import { DefaultTheme } from 'styled-components';

const defaultInterfaceFont =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";
const defaultMonospaceFont =
  'ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro","Fira Mono", "Droid Sans Mono", "Courier New", monospace;';

export const useTheme = (): DefaultTheme => {
  const sidebarOpacity = window.windowApi.os() === 'darwin' ? 0.5 : 1;

  const settings = useStore((state) => state.settings);

  // Update theme if settings.editorFont, settings.interfaceFont, or settings.editorFontSize changes with useEffect
  useEffect(() => {
    setTheme({
      ...theme,
      interfaceFont:
        settings.interfaceFont !== ''
          ? settings.interfaceFont
          : defaultInterfaceFont,
      interfaceFontSize: settings.interfaceFontSize,
      editorFont:
        settings.editorFont !== '' ? settings.editorFont : defaultInterfaceFont,
      editorFontSize: settings.editorFontSize,
      editorMonoFont:
        settings.editorMonoFont !== ''
          ? settings.editorMonoFont
          : defaultMonospaceFont,
      cssEditorFontSize: settings.cssEditorFontSize,
    });
  }, [settings]);

  const [theme, setTheme] = useState<DefaultTheme>({
    interfaceFont: settings.interfaceFont,
    interfaceFontSize: settings.interfaceFontSize,
    editorFont: settings.editorFont,
    editorMonoFont: settings.editorMonoFont,
    editorFontSize: settings.editorFontSize,
    cssEditorFontSize: settings.cssEditorFontSize,
    mainBg: 'rgba(33, 33, 37, 1)',
    mainFgText: 'rgba(240, 240, 248, 0.8)',
    mainFgTextSecondary: 'rgba(207, 207, 222, 0.8)',
    sidebarBg: `rgba(50, 50, 56, ${sidebarOpacity})`,
    sidebarFgText: 'rgba(240, 240, 248, 0.8)',
    sidebarFgTextSecondary: 'rgba(161, 161, 168, 0.7)',
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
  });

  return theme;
};
