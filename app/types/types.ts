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
  content: string;
  type: SectionType;
  canHaveChildren: boolean;
  children: Section[];
  collapsed?: boolean;
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
export const SectionContextMenuClosedEvent = 'section-context-menu-closed-event';
/* Event Data for Context Menu Events */
export type SectionContextMenuEventData = {
  id: string;
  x: number;
  y: number;
};
export type SectionContextMenuCloseEventData = {
  id: string;
}
