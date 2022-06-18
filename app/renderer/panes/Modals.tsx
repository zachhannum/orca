import NewBookModal from '../modals/NewBookModal';
import useStore from '../store/useStore';

const Modals = () => {
  const newBookModalOpen = useStore((state) => state.newBookModalOpen);
  const setNewBookModalOpen = useStore((state) => state.setNewBookModalOpen);
  return (
    <div>
      <NewBookModal
        isOpen={newBookModalOpen}
        onRequestClose={() => {
          setNewBookModalOpen(false);
        }}
      />
    </div>
  );
};

export default Modals;
