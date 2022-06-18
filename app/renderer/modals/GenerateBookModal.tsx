import { useRef } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import type { ModalProps } from './Modal';
import { TextField, Button } from '../controls';
import { buildBookPdf } from 'renderer/utils/buildPdf';

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
  const { onRequestClose } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      book: { value: string };
      author: { value: string };
      series: { value: string };
    };
    buildBookPdf();
    onRequestClose();
  };
  return (
    <Modal {...props}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <StyledModalContent>

          <div />
          <Button
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
