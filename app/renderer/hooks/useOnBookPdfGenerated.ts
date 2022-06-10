import { useEffect } from 'react';
import useStore from '../store/useStore';

const useOnBookPdfGenerated = (callback: () => void) => {
  useEffect(() => {
    window.pagedApi.onBookPdfGenerated((pdfStream: Buffer) => {

      callback();
    });
  });
};

export default useOnBookPdfGenerated;
