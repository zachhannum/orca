import type {
  FlattenInterpolation,
  ThemeProps,
  FlattenSimpleInterpolation,
  DefaultTheme,
} from 'styled-components';

/* BookDetails is used for creating a new project */
export type BookDetails = {
  bookTitle: string;
  authorName: string;
  seriesName: string;
};

/* SectionType is used to determine what type of section project content is */
export enum SectionType {
  frontmatter = 'frontmatter',
  maincontent = 'maincontent',
  backmatter = 'backmatter',
  folder = 'folder',
}

/* Section is a data structure that represents section content in a project */
export type Section = {
  id: string;
  name: string;
  content: string;
  type: SectionType;
  canHaveChildren: boolean;
  children: Section[];
  collapsed?: boolean;
};

export type SectionIdentifier = {
  id: string;
  name: string;
};

export type Sections = Section[];

/* Project is a data structure that mirrors the high level structure of project files */
export type Project = {
  version: string;
  bookTitle: string;
  bookSubTitle: string;
  authorName: string;
  seriesName: string;
  ISBN: string;
  language: string;
  publisher: string;
  content: Sections;
  publishSettings: PublishSettings;
};

/* ProjectData is used for passing Project data structures to and from main for saving/opening projects */
export type ProjectData = {
  projectContent: Project;
  folderPath: string;
  fileName: string;
};

/* ProjectGlance is stored in appData to be used for recent projects */
export type ProjectGlance = {
  bookTitle: string;
  authorName: string;
  folderPath: string;
  fileName: string;
};

/* Context Menu event types */
export const SectionContextMenuEvent = 'section-context-menu-event';
export const SectionContextMenuClosedEvent =
  'section-context-menu-closed-event';
/* Event Data for Context Menu Events */
export type SectionContextMenuEventData = {
  id: string;
  name: string;
  x: number;
  y: number;
};
export type SectionContextMenuClosedEventData = {
  id: string;
  rename: boolean;
};

/* Content needed for generating a Book PDF */
export type PagedBookContents = {
  html: string;
  css: string;
  title: string;
};

/* Settings */
export const endpointOptions = [
  'api.languagetool.org',
  'api.languagetoolplus.com',
  'Custom',
] as const;
export type EndpointOption = typeof endpointOptions[number];
export type Settings = {
  interfaceFont: string;
  interfaceFontSize: number;
  editorFont: string;
  editorMonoFont: string;
  editorFontSize: number;
  enableLanguageToolIntegration: boolean;
  languageToolEndpoint: EndpointOption;
  languageToolEndpointUrl: string;
  languageToolUsername: string;
  languageToolApiKey: string;
};

export const defaultSettings = {
  interfaceFont: '',
  interfaceFontSize: 11,
  editorFont: '',
  editorMonoFont: '',
  editorFontSize: 11,
  enableLanguageToolIntegration: false,
  languageToolEndpointUrl: 'https://api.languagetool.org',
  languageToolEndpoint: 'api.languagetool.org',
  languageToolUsername: '',
  languageToolApiKey: '',
} as Settings;

/* Component Styling */
export type CssMixinType =
  | FlattenInterpolation<ThemeProps<DefaultTheme>>
  | FlattenSimpleInterpolation
  | string
  | undefined;

/* Publish Types */
export type LeadIn = 'None' | 'Small Caps' | 'Italics';
export type PageHeader =
  | 'None'
  | 'Chapter Title'
  | 'Book Title'
  | 'Author Name';
export type ParagraphBreak = 'Indented' | 'Single Line Space';
export type LineHeight = 'Single' | '1.5' | 'Double';
export type SceneBreak = 'None' | '𐫱' | '❦' | '⁂' | '⁕' | '⁕ ⁕ ⁕' | '• • •';
export const popularTrimSizes = [
  '5in x 8in',
  '5.25in x 8in',
  '5.5in x 8.5in',
  '6in x 9in',
] as const;
export type PopularTrimSize = typeof popularTrimSizes[number];
export const additionalTrimSizes = [
  '5.06in x 7.81in',
  '5.5in x 8.25in',
  '6.14in x 9.21in',
] as const;
export type AdditionalTrimSize = typeof additionalTrimSizes[number];
export const internationalTrimSizes = [
  '4.72in x 7.48in',
  '4.92in x 7.48in',
  '5.31in x 8.46in',
  '5.83in x 8.27in',
] as const;
export type InternationalTrimSize = typeof internationalTrimSizes[number];
export const massMarketTrimSizes = [
  '4.12in x 6.75in',
  '4.25in x 7in',
  '4.37in x 7in',
] as const;
export type MassMarketTrimSize = typeof massMarketTrimSizes[number];

export type TrimSize =
  | PopularTrimSize
  | AdditionalTrimSize
  | InternationalTrimSize
  | MassMarketTrimSize;

export type PublishSettings = {
  dropCap: boolean;
  dropCapEnableAdvancedSettings: boolean;
  dropCapFont: string;
  dropCapLineHeight: number;
  dropCapBottomMargin: number;
  leadIn: LeadIn;
  paragraphBreak: ParagraphBreak;
  sceneBreak: SceneBreak;
  rectoPageHeaders: PageHeader;
  versoPageHeaders: PageHeader;
  paragraphFont: string;
  fontSize: number;
  lineHeight: LineHeight;
  dropFolio: boolean;
  topMargin: number;
  bottomMargin: number;
  insideMargin: number;
  outsideMargin: number;
  trimSize: TrimSize;
};

export const defaultPublishSettings = {
  dropCap: false,
  dropCapEnableAdvancedSettings: false,
  dropCapFont: '',
  dropCapLineHeight: 0.65,
  dropCapBottomMargin: 0.1,
  leadIn: 'None',
  paragraphBreak: 'Indented',
  sceneBreak: '𐫱',
  rectoPageHeaders: 'None',
  versoPageHeaders: 'None',
  paragraphFont: 'Times New Roman',
  fontSize: 12,
  lineHeight: 'Single',
  dropFolio: false,
  topMargin: 0.5,
  bottomMargin: 0.5,
  insideMargin: 0.75,
  outsideMargin: 0.5,
  trimSize: '5in x 8in',
} as PublishSettings;
