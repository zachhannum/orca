// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    mainBg: string;
    mainFgText: string;
    mainFgTextSecondary: string;
    sidebarBg: string;
    sidebarFgText: string;
    sidebarFgTextSecondary: string;
    dropdownBg: {
      default: string,
      alt: string,
    };
    dropdownText: string;
    dropdownArrow: string;
    optionSliderBg: string;
    optionSliderAltBg: string;
    optionSliderFg: string;
    optionSliderAltFg: string;
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
      default: string,
      alt: string,
    };
    toggleOffFg: string;
    toggleOffAltFg: string;
    toggleOnBg: string;
    toggleOnFg: string;
    radioOffBg: string;
    radioOffAltBg: string;
    radioOnBg: string;
    radioOnFg: string;
    radioText: string;
    themeSelectBorder: string;
    textInputBg: string;
    textInputAltBg: string;
    textInputPlaceholderFg: string;
    textInputPlaceholderAltFg: string;
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
    };
  }
}
