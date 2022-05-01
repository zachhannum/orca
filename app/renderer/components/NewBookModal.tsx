import { useRef } from 'react';
import Modal from 'react-modal';
import styled, { useTheme } from 'styled-components';
import { TextField, Button, IconButton } from '../controls';
import { ModalExitIcon } from '../icons';

const StyledModalTitle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 400px;
  color: ${(p) => p.theme.modalFgText};
  user-select: none;
`;
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

Modal.setAppElement('#root');

type NewBookModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const NewBookModal = ({ isOpen, onRequestClose }: NewBookModalProps) => {
  const theme = useTheme();
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="Modal"
      overlayClassName="Overlay"
    >
      <div>
        <StyledModalTitle>
          <div style={{ width: '12px' }} />
          <div>New Book</div>
          <IconButton
            onClick={onRequestClose}
            iconSize="12px"
            foregroundColor={theme.modalFgText}
          >
            <ModalExitIcon />
          </IconButton>
        </StyledModalTitle>
        <form ref={formRef} onSubmit={handleSubmit}>
          <StyledModalContent>
            <TextField
              name="book"
              styleVariant="altTwo"
              placeholder="Book Title"
              label="Book Title"
            />
            <TextField
              name="author"
              styleVariant="altTwo"
              placeholder="Author"
              label="Author Name"
            />
            <TextField
              name="series"
              styleVariant="altTwo"
              placeholder="Series Name"
              label="Series Name"
            />
            <div />
            <Button
              label="Create"
              onClick={() => {
                formRef.current?.requestSubmit();
              }}
            />
          </StyledModalContent>
        </form>
      </div>
    </Modal>
  );
};

export default NewBookModal;
