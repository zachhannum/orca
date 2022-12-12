import {
  GenerateBookModal,
  NewBookModal,
  SettingsModal,
} from 'renderer/modals/';
import useStore from '../store/useStore';

const Modals = () => {
  const [
    bookTitle,
    newBookModalOpen,
    setNewBookModalOpen,
    generateBookModalOpen,
    setGenerateBookModalOpen,
    settingsModalOpen,
    setSettingsModalOpen,
  ] = useStore((state) => {
    return [
      state.bookTitle,
      state.newBookModalOpen,
      state.setNewBookModalOpen,
      state.generateBookModalOpen,
      state.setGenerateBookModalOpen,
      state.settingsModalOpen,
      state.setSettingsModalOpen,
    ];
  });

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
      <SettingsModal
        title=""
        isOpen={settingsModalOpen}
        onRequestClose={() => {
          setSettingsModalOpen(false);
        }}
      />
    </div>
  );
};

export default Modals;
