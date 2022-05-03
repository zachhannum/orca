import { BookDetails, Project } from '../../types/types';

const getProjectTemplate = (bookDetails: BookDetails): Project => {
  return {
    bookTitle: bookDetails.bookTitle,
    bookSubTitle: '',
    authorName: bookDetails.authorName,
    seriesName: bookDetails.seriesName,
    ISBN: '',
    language: '',
    publisher: '',
    frontMatter: [],
    mainContent: [],
    backMatter: [],
  };
};

export default getProjectTemplate;
