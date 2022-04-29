export type BookDetails = {
  bookTitle: string;
  authorName: string;
  seriesName: string;
};

export type ProjectContent = {
  path: string;
  type: string;
};

export type Project = {
  bookTitle: string;
  bookSubTitle: string;
  authorName: string;
  seriesName: string;
  ISBN: string;
  language: string;
  publisher: string;
  content: ProjectContent[];
};
