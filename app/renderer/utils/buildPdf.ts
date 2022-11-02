import { baseStylesheet } from 'renderer/pagedjs/usePagedCss';
import { parseBookContentToHtml } from './buildBook';
import useStore from '../store/useStore';

export const buildBookPdf = async () => {
  const html = parseBookContentToHtml();
  const {bookTitle} = useStore.getState();
  window.pagedApi.generateBookPdf({
    html,
    css: baseStylesheet({
      paragraphFontSize: 11,
    }).toString(),
    title: bookTitle
  });
  window.pagedApi.onBookPdfGenerated((buffer: Buffer) => {
    console.log('book generated!');
    console.log(buffer);
  })
};
