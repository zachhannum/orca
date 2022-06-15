import { baseStylesheet } from 'renderer/pagedjs/defaultPageCss';
import { parseBookContentToHtml } from './buildBook';

export const buildBookPdf = async () => {
  const html = parseBookContentToHtml();
  window.pagedApi.generateBookPdf({
    html,
    css: baseStylesheet({
      paragraphFontSize: 8,
    }).toString(),
  });
  window.pagedApi.onBookPdfGenerated((buffer: Buffer) => {
    console.log('book generated!');
    console.log(buffer);
  })
};
