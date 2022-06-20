import GenerateBookModal from 'renderer/modals/GenerateBookModal';
import NewBookModal from '../modals/NewBookModal';
import useStore from '../store/useStore';

const Modals = () => {
  const newBookModalOpen = useStore((state) => state.newBookModalOpen);
  const setNewBookModalOpen = useStore((state) => state.setNewBookModalOpen);
  const generateBookModalOpen = useStore(
    (state) => state.generateBookModalOpen
  );
  const setGenerateBookModalOpen = useStore(
    (state) => state.setGenerateBookModalOpen
  );
  const bookTitle = useStore((state) => state.bookTitle);
  return (
    <div>
      <NewBookModal
        title="New Book"
        isOpen={newBookModalOpen}
        onRequestClose={() => {
          setNewBookModalOpen(false);
        }}
      />
      <GenerateBookModal
        title={bookTitle}
        isOpen={generateBookModalOpen}
        onRequestClose={() => {
          setGenerateBookModalOpen(false);
        }}
      />
    </div>
  );
};

export default Modals;
