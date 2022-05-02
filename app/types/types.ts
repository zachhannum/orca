export type BookDetails = {
  bookTitle: string;
  authorName: string;
  seriesName: string;
};

export type ProjectContent = {
  path: string;
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

export type ProjectData = {
  projectContent: Project;
  filePath: string;
};
