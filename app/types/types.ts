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
}

/* SectionData is a data structure that represents section content in a project */
export type SectionData = {
  name: string;
  content: string;
  type: SectionType;
};

/* Project is a data structure that mirrors the high level structure of project files */
export type Project = {
  bookTitle: string;
  bookSubTitle: string;
  authorName: string;
  seriesName: string;
  ISBN: string;
  language: string;
  publisher: string;
  content: SectionData[];
};

/* ProjectData is used for passing Project data structures to and from main for saving/opening projects */
export type ProjectData = {
  projectContent: Project;
  folderPath: string;
  fileName: string;
};
