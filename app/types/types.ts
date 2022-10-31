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
  bookTitle: string;
  bookSubTitle: string;
  authorName: string;
  seriesName: string;
  ISBN: string;
  language: string;
  publisher: string;
  content: Sections;
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
export type SceneBreak = '𐫱' | '❦' | '⁂' | '⁕' | '⁕ ⁕ ⁕' | '• • •';
export type PopularTrimSize = '5 x 8' | '5.25 x 8' | '5.5 x 8.5';
export type AdditionalTrimSize = '5.06 x 7.81' | '5.5 x 8.25' | '6.14 x 9.21';
export type InternationalTrimSize =
  | '4.72 x 7.48'
  | '4.92 x 7.48'
  | '5.83 x 8.27'
  | '5.31 x 8.46';
export type MassMarketTrimSize = '4.12 x 6.75' | '4.25 x 7' | '4.37 x 7';
export type TrimSize =
  | PopularTrimSize
  | AdditionalTrimSize
  | InternationalTrimSize
  | MassMarketTrimSize;
