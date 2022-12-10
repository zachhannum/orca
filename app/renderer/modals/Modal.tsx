import ReactModal from 'react-modal';
import styled, { useTheme } from 'styled-components';
import { IconButton } from '../controls';
import { ModalExitIcon } from '../icons';

const StyledModalTitle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  font-size: 1.1em;
  width: 400px;
  color: ${(p) => p.theme.modalFgText};
  user-select: none;
  position: relative;
`;

const StyledExitDiv = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

ReactModal.setAppElement('#root');

export type ModalProps = {
  title: string;
  isOpen: boolean;
  onRequestClose: () => void;
  children?: React.ReactNode;
};

const Modal = ({ title, isOpen, onRequestClose, children }: ModalProps) => {
  const theme = useTheme();

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={{
        base: 'Modal',
        afterOpen: 'ModalAfterOpen',
        beforeClose: 'ModalBeforeClose',
      }}
      overlayClassName={{
        base: 'Overlay',
        afterOpen: 'OverlayAfterOpen',
        beforeClose: 'OverlayBeforeClose',
      }}
      closeTimeoutMS={200}
    >
      <>
        <StyledModalTitle>
          <div style={{ width: '12px' }} />
          <div>{title}</div>
          <IconButton
            onClick={onRequestClose}
            iconSize="12px"
            foregroundColor={theme.sidebarIconFg}
          >
            <ModalExitIcon />
          </IconButton>
        </StyledModalTitle>
        {children}
      </>
    </ReactModal>
  );
};

export default Modal;
