// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    interfaceFont: string;
    editorFont: string;
    editorFontSize: number;
    mainBg: string;
    mainFgText: string;
    mainFgTextSecondary: string;
    sidebarBg: string;
    sidebarFgText: string;
    sidebarFgTextSecondary: string;
    dropdownBg: {
      default: string;
      alt: string;
    };
    dropdownText: string;
    dropdownArrow: string;
    optionSliderBg: {
      default: string;
      alt: string;
    };
    optionSliderFg: {
      default: string;
      alt: string;
    };
    optionSliderText: string;
    buttonPrimaryBg: string;
    buttonPrimaryText: string;
    previewBg: string;
    previewDropdownBg: string;
    previewDropdownText: string;
    previewArrow: string;
    checkUnselectedBg: string;
    checkUnselectedAltBg: string;
    checkSelectedBg: string;
    checkFg: string;
    toggleOffBg: {
      default: string;
      alt: string;
    };
    toggleOffFg: {
      default: string;
      alt: string;
    };
    toggleOnBg: string;
    toggleOnFg: string;
    radioOffBg: string;
    radioOffAltBg: string;
    radioOnBg: string;
    radioOnFg: string;
    radioText: string;
    themeSelectBorder: string;
    textInputBg: {
      default: string;
      altOne: string;
      altTwo: string;
    };
    textInputPlaceholderFg: {
      default: string;
      altOne: string;
      altTwo: string;
    };
    sidebarIconBg: string;
    sidebarIconFg: string;
    chapterTitleDropdownBg: string;
    chapterTitleDropdownInset: string;
    progressBarBg: string;
    progressBarFg: string;
    contextMenuBg: string;
    contextMenuDivider: string;
    contextMenuFg: string;
    contextMenuExit: string;
    searchBg: string;
    searchPlaceholder: string;
    paperBg: string;
    modalFgText: string;
  }
}
