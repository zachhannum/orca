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
