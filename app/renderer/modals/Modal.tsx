import ReactModal from 'react-modal';
import styled, { useTheme } from 'styled-components';
import { IconButton } from '../controls';
import { ModalExitIcon } from '../icons';

const StyledModalTitle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 1.1em;
  min-width: 400px;
  color: ${(p) => p.theme.modalFgText};
  user-select: none;
  position: relative;
`;

const StyledExitDiv = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
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
        {title.length > 0 && <StyledModalTitle>{title}</StyledModalTitle>}
        <StyledExitDiv>
          <IconButton
            onClick={onRequestClose}
            iconSize="12px"
            foregroundColor={theme.modalFgText}
          >
            <ModalExitIcon />
          </IconButton>
        </StyledExitDiv>
        {children}
      </>
    </ReactModal>
  );
};

export default Modal;
