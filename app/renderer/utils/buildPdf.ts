import { baseStylesheet } from 'renderer/pagedjs/defaultPageCss';
import { parseBookContentToHtml } from './buildBook';

export const buildBookPdf = async () => {
  const html = parseBookContentToHtml();
  window.pagedApi.generateBookPdf({
    html,
    css: baseStylesheet({
      paragraphFontSize: 11,
    }).toString(),
  });
};
