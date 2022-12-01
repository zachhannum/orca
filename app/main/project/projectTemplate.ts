import { app } from 'electron';
import { BookDetails, Project } from 'types/types';

const getProjectTemplate = (bookDetails: BookDetails): Project => {
  return {
    version: app.getVersion(),
    bookTitle: bookDetails.bookTitle,
    bookSubTitle: '',
    authorName: bookDetails.authorName,
    seriesName: bookDetails.seriesName,
    ISBN: '',
    language: '',
    publisher: '',
    content: [],
    /* TODO this should use defaultPublishSettings from types/types, but there is a resolve error */
    publishSettings: {
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
      trimSize: '5 x 8',
    },
  };
};

export default getProjectTemplate;
