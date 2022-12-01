import { parseBookContentToHtml } from './buildBook';
import useStore from '../store/useStore';

export const buildBookPdf = async (css: string) => {
  const html = parseBookContentToHtml();
  const { bookTitle } = useStore.getState();
  window.pagedApi.generateBookPdf({
    html,
    css,
    title: bookTitle,
  });
  window.pagedApi.onBookPdfGenerated((buffer: Buffer) => {
    console.log('book generated!');
    console.log(buffer);
  });
};
