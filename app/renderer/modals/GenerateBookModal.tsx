import { useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import type { ModalProps } from './Modal';
import { Button } from '../controls';
import { buildBookPdf } from 'renderer/utils/buildPdf';
import { useOnBookPdfGenerated } from 'renderer/hooks';

const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 10px;
  margin: 35px;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const GenerateBookModal = (props: ModalProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isBuildingPdf, setIsBuildingPdf] = useState(false);

  useOnBookPdfGenerated(() => {
    setIsBuildingPdf(false);
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      book: { value: string };
      author: { value: string };
      series: { value: string };
    };
    setIsBuildingPdf(true);
    buildBookPdf();
  };
  return (
    <Modal {...props}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <StyledModalContent>
          <div />
          <Button
            loading={isBuildingPdf}
            onClick={() => {
              formRef.current?.requestSubmit();
            }}
          >
            Generate
          </Button>
        </StyledModalContent>
      </form>
    </Modal>
  );
};

export default GenerateBookModal;
