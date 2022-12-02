import { useEffect } from 'react';

const useOnBookPdfGenerated = (callback: () => void) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    window.pagedApi.onBookPdfGenerated((_pdfStream: Buffer) => {
      callback();
    });
  }, []);
};

export default useOnBookPdfGenerated;
