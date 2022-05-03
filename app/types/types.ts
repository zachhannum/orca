export type BookDetails = {
  bookTitle: string;
  authorName: string;
  seriesName: string;
};

export type ProjectContent = {
  name: string;
};

export type Project = {
  bookTitle: string;
  bookSubTitle: string;
  authorName: string;
  seriesName: string;
  ISBN: string;
  language: string;
  publisher: string;
  frontMatter: ProjectContent[];
  mainContent: ProjectContent[];
  backMatter: ProjectContent[];
};

export enum SectionType {
  frontmatter = 'frontmatter',
  maincontent = 'maincontent',
  backmatter = 'backmatter',
}

export type ProjectData = {
  projectContent: Project;
  folderPath: string;
  fileName: string;
};

export type SectionData = {
  name: string;
  content: string;
  type: SectionType;
};
