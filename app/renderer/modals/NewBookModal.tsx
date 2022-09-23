import { useRef } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import type { ModalProps } from './Modal';
import { TextField, Button } from '../controls';

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

const NewBookModal = (props: ModalProps) => {
  const { onRequestClose } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      book: { value: string };
      author: { value: string };
      series: { value: string };
    };
    window.projectApi.createProject({
      bookTitle: target.book.value,
      authorName: target.author.value,
      seriesName: target.series.value,
    });
    onRequestClose();
  };
  return (
    <Modal {...props}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <StyledModalContent>
          <TextField
            name="book"
            styleVariant="altTwo"
            placeholder="Book Title"
            label="Book Title"
            fullWidth
          />
          <TextField
            name="author"
            styleVariant="altTwo"
            placeholder="Author"
            label="Author Name"
            fullWidth
          />
          <TextField
            name="series"
            styleVariant="altTwo"
            placeholder="Series Name"
            label="Series Name"
            fullWidth
          />
          <div />
          <Button
            onClick={() => {
              formRef.current?.requestSubmit();
            }}
          >
            Create
          </Button>
        </StyledModalContent>
      </form>
    </Modal>
  );
};

export default NewBookModal;
